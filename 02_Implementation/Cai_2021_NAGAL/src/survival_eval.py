"""Censoring-aware internal-test diagnostics; never changes fitted models."""
import numpy as np
import pandas as pd
from lifelines import KaplanMeierFitter
from scipy.optimize import minimize
from scipy.special import expit
from sksurv.metrics import concordance_index_censored, cumulative_dynamic_auc, brier_score
from sksurv.nonparametric import CensoringDistributionEstimator
from sksurv.util import Surv


def horizon_status(times, events, horizon):
    return [1 if e and t <= horizon else 0 if t >= horizon else None for t, e in zip(times, events)]


def horizon_surv(times, events, horizon):
    times, events = np.asarray(times), np.asarray(events)
    # AUC/Brier library requires max(eval time) > horizon. A tiny artificial
    # censoring boundary represents known event-free status at the horizon.
    return Surv.from_arrays((events == 1) & (times <= horizon), np.minimum(times, np.nextafter(horizon, np.inf)))


def metric_values(development, evaluation, risks, linear_risks, horizon):
    train_y = Surv.from_arrays(development.event.astype(bool), development.time)
    test_y = horizon_surv(evaluation.time, evaluation.event, horizon)
    c = concordance_index_censored(evaluation.event.to_numpy().astype(bool), evaluation.time.to_numpy(), linear_risks)[0]
    auc = cumulative_dynamic_auc(train_y, test_y, risks, [horizon])[0][0]
    bs = brier_score(train_y, test_y, (1-risks)[:, None], [horizon])[1][0]
    return {'harrell_c': float(c), 'auc_5y_ipcw': float(auc), 'brier_5y_ipcw': float(bs)}


def bootstrap_metrics(development, evaluation, risks, linear_risks, horizon, replicates, seed):
    point = metric_values(development, evaluation, risks, linear_risks, horizon)
    draws, failed = [], 0
    rng = np.random.default_rng(seed)
    for _ in range(replicates):
        ix = rng.integers(0, len(evaluation), len(evaluation))
        try:
            row = metric_values(development, evaluation.iloc[ix], risks[ix], linear_risks[ix], horizon)
            if not np.isfinite(list(row.values())).all():
                raise ValueError('nonfinite bootstrap metric')
            draws.append(row)
        except (ValueError, ZeroDivisionError):
            failed += 1
    if len(draws) < .9 * replicates:
        raise ValueError('Too many undefined bootstrap replicates')
    draws = pd.DataFrame(draws)
    result = {name: {'estimate': value, 'ci95': np.quantile(draws[name], [.025, .975]).tolist()} for name, value in point.items()}
    result.update({'bootstrap_requested': replicates, 'bootstrap_valid': len(draws), 'bootstrap_failed': failed,
                   'ci_scope': 'test sampling conditional on fitted development model; development censoring distribution fixed'})
    return result


def calibration(development, evaluation, risks, horizon):
    ydev = Surv.from_arrays(development.event.astype(bool), development.time)
    censor = CensoringDistributionEstimator().fit(ydev)
    g_h = float(censor.predict_proba([horizon])[0])
    if g_h <= 0:
        raise ValueError('No censoring support at five years')
    times = evaluation.time.to_numpy()
    events = evaluation.event.to_numpy()
    case = (events == 1) & (times <= horizon)
    control = times > horizon
    # A person censored exactly at horizon is known event-free through horizon.
    control |= (times == horizon) & (events == 0)
    weights = np.zeros(len(times))
    weights[case] = 1 / censor.predict_proba(times[case])
    weights[control] = 1 / g_h
    target = case.astype(float)
    p = np.clip(risks, 1e-10, 1-1e-10)
    lp = np.log(p/(1-p))

    def loss(coef, fixed_slope=False):
        eta = coef[0] + (lp if fixed_slope else coef[1]*lp)
        return float(np.sum(weights * (np.logaddexp(0, eta) - target * eta)))

    def gradient(coef, fixed_slope=False):
        eta = coef[0] + (lp if fixed_slope else coef[1]*lp)
        residual = weights * (expit(eta) - target)
        return np.array([residual.sum()]) if fixed_slope else np.array([residual.sum(), residual @ lp])

    intercept = minimize(loss, [0.], args=(True,), jac=gradient, method='BFGS', options={'gtol': 1e-5})
    slope = minimize(loss, [0., 1.], jac=gradient, method='BFGS', options={'gtol': 1e-5})
    diagnostic = {'method': 'IPCW logistic calibration at five years; no recalibration applied',
                  'censoring_survival_5y_development': g_h,
                  'intercept_slope_fixed_one': float(intercept.x[0]) if intercept.success else None,
                  'joint_intercept': float(slope.x[0]) if slope.success else None,
                  'slope': float(slope.x[1]) if slope.success else None,
                  'optimization_messages': [str(intercept.message), str(slope.message)],
                  'early_censored_n': int((weights == 0).sum())}
    groups = pd.qcut(pd.Series(risks), q=5, labels=False, duplicates='drop')
    rows = []
    for group in sorted(groups.dropna().unique()):
        ix = groups.to_numpy() == group
        km = KaplanMeierFitter().fit(times[ix], events[ix])
        rows.append({'group': int(group)+1, 'n': int(ix.sum()), 'mean_predicted': float(risks[ix].mean()),
                     'observed_km_5y': float(1-km.predict(horizon)), 'at_risk_5y': int((times[ix] >= horizon).sum()),
                     'events_5y': int(case[ix].sum())})
    return diagnostic, pd.DataFrame(rows)
