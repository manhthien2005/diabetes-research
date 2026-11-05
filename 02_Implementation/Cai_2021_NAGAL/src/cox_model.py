"""Development-only estimation and portable Cox prediction."""
import warnings
import numpy as np
import pandas as pd
from lifelines import CoxPHFitter
from lifelines.statistics import proportional_hazard_test
from scipy.special import logsumexp
from sklearn.impute import SimpleImputer
from sklearn.exceptions import ConvergenceWarning
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
    ratios = np.geomspace(1., config['alpha_min_ratio'], config['alpha_count'])
    folds = StratifiedKFold(n_splits=config['cv_folds'], shuffle=True, random_state=config['seed'])
    scores, alpha_maxima, path_lengths = [], [], []

    def fit_path(values, fold_times, fold_events):
        # Library-generated path starts at the TRAINING fold's alpha_max and
        # uses warm starts. Independent cold fits at tiny penalties were unstable.
        with warnings.catch_warnings():
            warnings.simplefilter('error', ConvergenceWarning)
            path = CoxnetSurvivalAnalysis(n_alphas=config['alpha_count'], alpha_min_ratio=config['alpha_min_ratio'],
                                         l1_ratio=1., max_iter=100000, tol=1e-7)
            path.fit(values, Surv.from_arrays(fold_events.astype(bool), fold_times))
        return path

    for fold, (tr, va) in enumerate(folds.split(x, events)):
        a, b, _ = scale_fold(x.iloc[tr], x.iloc[va])
        path = fit_path(a, times[tr], events[tr])
        alpha_maxima.append(float(path.alphas_[0])); path_lengths.append(len(path.alphas_))
        scores.append([validation_deviance(times[va], events[va], b @ path.coef_[:, j]) for j in range(len(path.alphas_))])
    prep = make_pipeline(SimpleImputer(strategy='median'), StandardScaler())
    a = prep.fit_transform(x)
    model = fit_path(a, times, events)
    # Early-stopped tails are not extrapolated or cold-restarted. Compare only
    # the ratio-grid prefix that every fold and full-development fit supports.
    common = min(min(path_lengths), len(model.alphas_))
    if common < 2:
        raise ValueError('Insufficient shared Coxnet path; inspect development fit')
    scores = np.asarray([row[:common] for row in scores])
    means = scores.mean(axis=0)
    se = scores.std(axis=0, ddof=1) / np.sqrt(len(scores))
    minimum = int(np.argmin(means))
    selected = int(np.flatnonzero(means <= means[minimum] + se[minimum])[0])
    names = x.columns[np.abs(model.coef_[:, selected]) > 1e-8].tolist()
    if not names:
        raise ValueError('One-SE LASSO selected no predictors; no test-guided fallback')
    table = pd.DataFrame({'penalty_ratio': ratios[:common], 'alpha_full_development': model.alphas_[:common],
                          'mean_deviance': means, 'se': se, 'selected': np.arange(common) == selected})
    for fold in range(len(scores)):
        table[f'fold_{fold + 1}'] = scores[fold]
    detail = {'selected_alpha': float(model.alphas_[selected]), 'minimum_alpha': float(model.alphas_[minimum]),
              'selected_penalty_ratio': float(ratios[selected]), 'fold_alpha_max': alpha_maxima,
              'fold_path_lengths': path_lengths, 'full_development_path_length': len(model.alphas_), 'common_path_length': common, 'selected_features': names,
              'candidate_features': x.columns.tolist(), 'development_imputation_medians': prep.named_steps['simpleimputer'].statistics_.tolist(),
              'development_scaler_mean': prep.named_steps['standardscaler'].mean_.tolist(), 'development_scaler_scale': prep.named_steps['standardscaler'].scale_.tolist(),
              'penalized_coefficients_standardized': model.coef_[:, selected].tolist()}
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
