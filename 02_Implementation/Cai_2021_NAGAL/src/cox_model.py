"""Development-only estimation and portable Cox prediction."""
import numpy as np
import pandas as pd
from lifelines import CoxPHFitter
from lifelines.statistics import proportional_hazard_test
from scipy.special import logsumexp
from sklearn.impute import SimpleImputer
from sklearn.model_selection import StratifiedKFold
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sksurv.linear_model import CoxnetSurvivalAnalysis
from sksurv.util import Surv

from nagala_data import assert_predictors


def scale_fold(train, validation):
    transform = make_pipeline(SimpleImputer(strategy='median'), StandardScaler())
    a = transform.fit_transform(train)
    b = transform.transform(validation)
    return a, b, transform.named_steps['standardscaler']


def validation_deviance(times, events, eta):
    # Held-out Breslow partial likelihood. A documented reconstruction choice,
    # not a claim to reproduce cv.glmnet's grouped deviance implementation.
    losses = [logsumexp(eta[times >= t]) - eta[i] for i, t in enumerate(times) if events[i]]
    if not losses:
        raise ValueError('No validation events')
    return float(2 * np.mean(losses))


def select_lasso(x, times, events, config):
    assert_predictors(x.columns.tolist())
    alphas = np.geomspace(config['alpha_max'], config['alpha_min'], config['alpha_count'])
    folds = StratifiedKFold(n_splits=config['cv_folds'], shuffle=True, random_state=config['seed'])
    scores = []
    for fold, (tr, va) in enumerate(folds.split(x, events)):
        a, b, _ = scale_fold(x.iloc[tr], x.iloc[va])
        path = CoxnetSurvivalAnalysis(alphas=alphas, l1_ratio=1., max_iter=100000, tol=1e-7)
        path.fit(a, Surv.from_arrays(events[tr].astype(bool), times[tr]))
        coefficients = []
        for j, alpha in enumerate(alphas):
            if j < len(path.alphas_):
                coefficients.append(path.coef_[:, j])
            else:
                # Coxnet may stop a multi-alpha path early after little gain.
                # Complete the prespecified grid, without changing it or using test.
                single = CoxnetSurvivalAnalysis(alphas=[alpha], l1_ratio=1., max_iter=100000, tol=1e-7)
                single.fit(a, Surv.from_arrays(events[tr].astype(bool), times[tr]))
                coefficients.append(single.coef_[:, 0])
        scores.append([validation_deviance(times[va], events[va], b @ coef) for coef in coefficients])
    scores = np.asarray(scores)
    means = scores.mean(axis=0)
    se = scores.std(axis=0, ddof=1) / np.sqrt(len(scores))
    minimum = int(np.argmin(means))
    selected = int(np.flatnonzero(means <= means[minimum] + se[minimum])[0])
    prep = make_pipeline(SimpleImputer(strategy='median'), StandardScaler())
    a = prep.fit_transform(x)
    model = CoxnetSurvivalAnalysis(alphas=[alphas[selected]], l1_ratio=1., max_iter=100000, tol=1e-7)
    model.fit(a, Surv.from_arrays(events.astype(bool), times))
    names = x.columns[np.abs(model.coef_[:, 0]) > 1e-8].tolist()
    if not names:
        raise ValueError('One-SE LASSO selected no predictors; no test-guided fallback')
    table = pd.DataFrame({'alpha': alphas, 'mean_deviance': means, 'se': se, 'selected': np.arange(len(alphas)) == selected})
    for fold in range(len(scores)):
        table[f'fold_{fold + 1}'] = scores[fold]
    detail = {'selected_alpha': float(alphas[selected]), 'minimum_alpha': float(alphas[minimum]), 'selected_features': names,
              'candidate_features': x.columns.tolist(), 'development_imputation_medians': prep.named_steps['simpleimputer'].statistics_.tolist(),
              'development_scaler_mean': prep.named_steps['standardscaler'].mean_.tolist(), 'development_scaler_scale': prep.named_steps['standardscaler'].scale_.tolist(),
              'penalized_coefficients_standardized': model.coef_[:, 0].tolist()}
    return names, table, detail


def fit_cox(data, features):
    assert_predictors(features)
    imputer = SimpleImputer(strategy='median')
    values = imputer.fit_transform(data[features])
    train = pd.DataFrame(values, columns=features, index=data.index)
    train['time'] = data.time.to_numpy()
    train['event'] = data.event.to_numpy()
    model = CoxPHFitter(penalizer=0., baseline_estimation_method='breslow')
    model.fit(train, duration_col='time', event_col='event')
    ph = proportional_hazard_test(model, train, time_transform='rank').summary.reset_index().rename(columns={'index': 'feature'})
    baseline = model.baseline_cumulative_hazard_
    bundle = {'format': 'cox_breslow_centered_v1', 'features': features,
              'imputation_medians': imputer.statistics_.tolist(),
              'centering': train[features].mean().tolist(), 'coefficients': model.params_.loc[features].tolist(),
              'baseline_times': baseline.index.to_numpy().tolist(), 'baseline_cumulative_hazard': baseline.iloc[:, 0].tolist(),
              'ties': 'efron', 'baseline_estimator': 'breslow', 'time_unit': 'days'}
    return model, bundle, ph


def linear_predictor(bundle, data):
    x = data[bundle['features']].to_numpy(dtype=float)
    x = np.where(np.isnan(x), np.asarray(bundle['imputation_medians']), x)
    if not np.isfinite(x).all():
        raise ValueError('Nonfinite predictor')
    return (x - np.asarray(bundle['centering'])) @ np.asarray(bundle['coefficients'])


def predict_risk(bundle, data, horizon):
    times = np.asarray(bundle['baseline_times'])
    if not 0 < horizon <= times[-1]:
        raise ValueError('Horizon outside development follow-up support')
    i = int(np.searchsorted(times, horizon, side='right') - 1)
    h0 = 0. if i < 0 else bundle['baseline_cumulative_hazard'][i]
    return -np.expm1(-h0 * np.exp(linear_predictor(bundle, data)))
