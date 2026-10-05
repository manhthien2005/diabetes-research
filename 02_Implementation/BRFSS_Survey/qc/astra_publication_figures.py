"""Publication-only figures from frozen predictions. No model fitting or selection."""
import argparse
import hashlib
import json
from pathlib import Path
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from sklearn.metrics import roc_curve, precision_recall_curve, confusion_matrix
from sklearn.calibration import calibration_curve

ROOT = Path(__file__).resolve().parents[3]
Q = Path(__file__).resolve().parent
MODELS = ['logistic_regression', 'decision_tree', 'random_forest', 'gradient_boosting',
          'xgboost', 'linear_svm', 'gaussian_naive_bayes']
LABELS = ['Logistic regression', 'Decision tree', 'Random forest', 'Gradient boosting',
          'XGBoost', 'Linear SVM', 'Gaussian NB']


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--source', type=Path, required=True)
    args = ap.parse_args()
    src = args.source
    dest = ROOT / '03_Final_Result/BRFSS_2025/supplement/astra_figures'
    dest.mkdir(parents=True, exist_ok=True)
    pp = src / 'model_comparison/paired_test_predictions.csv.gz'
    manifest = json.loads((Q / 'astra_evidence_manifest.json').read_text(encoding='utf-8'))
    assert hashlib.sha256(pp.read_bytes()).hexdigest() == manifest['prediction_sha256']
    data = pd.read_csv(pp, float_precision='round_trip')
    y = data.y_true.to_numpy()
    metrics = pd.read_csv(Q / 'astra_statistics_point_metrics.csv').set_index('model').loc[MODELS]
    plt.rcParams.update({'font.size': 10, 'axes.spines.top': False, 'axes.spines.right': False})

    def save(fig, name):
        fig.savefig(dest / (name + '.png'), dpi=180, bbox_inches='tight')
        plt.close(fig)

    fig, axes = plt.subplots(1, 2, figsize=(13, 5.2), layout='constrained')
    for model, label in zip(MODELS, LABELS):
        score = data[model+'_score'].to_numpy()
        fpr, tpr, _ = roc_curve(y, score)
        precision, recall, _ = precision_recall_curve(y, score)
        axes[0].plot(fpr, tpr, label=f'{label} ({metrics.loc[model,"roc_auc"]:.4f})', lw=1.3)
        axes[1].step(recall, precision, where='post',
                     label=f'{label} ({metrics.loc[model,"pr_auc"]:.4f})', lw=1.1)
    axes[0].plot([0, 1], [0, 1], '--', color='grey', lw=1)
    axes[1].axhline(y.mean(), linestyle='--', color='grey', lw=1, label=f'Sample fraction ({y.mean():.4f})')
    for ax in axes:
        ax.set_xlim(0, 1); ax.set_ylim(0, 1.02); ax.legend(fontsize=8)
    axes[0].set(xlabel='False positive rate', ylabel='True positive rate', title='ROC (legend: ROC-AUC)')
    axes[1].set(xlabel='Recall', ylabel='Precision', title='Precision–recall (legend: Average Precision)')
    save(fig, 'discrimination')

    cols = ['accuracy', 'balanced_accuracy', 'precision', 'recall', 'specificity', 'f1', 'roc_auc', 'pr_auc']
    fig, ax = plt.subplots(figsize=(11, 5.5), layout='constrained')
    values = metrics[cols].to_numpy()
    im = ax.imshow(values, vmin=0, vmax=1, cmap='cividis', aspect='auto')
    ax.set_yticks(range(7), LABELS)
    ax.set_xticks(range(8), ['Accuracy', 'Balanced\naccuracy', 'Precision', 'Recall', 'Specificity', 'F1', 'ROC-AUC', 'AP'])
    for (i, j), value in np.ndenumerate(values):
        ax.text(j, i, f'{value:.3f}', ha='center', va='center', color='white' if value < .5 else 'black')
    ax.set_title('Fixed-threshold metrics and discrimination; internal test n = 68,508')
    fig.colorbar(im, ax=ax, label='Metric value (compare within columns)')
    save(fig, 'metric_matrix')

    fig, axes = plt.subplots(2, 3, figsize=(12, 7.3), layout='constrained')
    bin_rows = []
    for ax, model, label in zip(axes.flat, [m for m in MODELS if m != 'linear_svm'],
                               [l for m, l in zip(MODELS, LABELS) if m != 'linear_svm']):
        obs, pred = calibration_curve(y, data[model+'_score'], n_bins=10, strategy='quantile')
        ax.plot(pred, obs, 'o-', lw=1.2)
        ax.plot([0, 1], [0, 1], '--', color='grey', lw=1)
        ax.set(xlim=(0, 1), ylim=(0, 1), title=f'{label}: {len(obs)} populated bins',
               xlabel='Mean predicted probability', ylabel='Observed fraction')
        for i, (p, o) in enumerate(zip(pred, obs)):
            bin_rows.append(dict(model=model, bin=i+1, mean_probability=p, observed_fraction=o))
    fig.suptitle('Calibration: up to 10 quantile bins; ties can collapse bins; no recalibration')
    save(fig, 'calibration')
    pd.DataFrame(bin_rows).to_csv(dest / 'calibration_bins.csv', index=False, lineterminator='\n')

    fig, axes = plt.subplots(2, 4, figsize=(13, 6.3), layout='constrained')
    for ax, model, label in zip(axes.flat, MODELS, LABELS):
        cm = confusion_matrix(y, data[model+'_pred'], labels=[0, 1])
        ax.imshow(cm / cm.sum(axis=1, keepdims=True), vmin=0, vmax=1, cmap='Blues')
        for (i, j), value in np.ndenumerate(cm):
            ax.text(j, i, f'{value:,}', ha='center', va='center', color='white' if value/cm[i].sum() > .6 else 'black')
        ax.set(xticks=[0, 1], yticks=[0, 1], xlabel='Predicted class', ylabel='Observed class', title=label)
    axes.flat[-1].axis('off')
    axes.flat[-1].text(.02, .7, 'Counts in cells\nColour: fraction within observed class\nProbability threshold: 0.5\nSVM native margin: 0', fontsize=10)
    save(fig, 'confusion_matrices')

    fig, ax = plt.subplots(figsize=(8, 5), layout='constrained')
    offsets = [(48, 3), (8, -5), (-88, -18), (8, 12), (48, -14), (8, 0), (-95, 8)]
    for model, label, offset in zip(MODELS, LABELS, offsets):
        row = metrics.loc[model]
        ax.scatter(row.recall, row.precision)
        ax.annotate(label, (row.recall, row.precision), xytext=offset,
                    textcoords='offset points', fontsize=9,
                    arrowprops={'arrowstyle': '-', 'color': 'grey', 'lw': .7}
                    if model in {'logistic_regression', 'xgboost'} else None)
    ax.set(xlim=(0, .85), ylim=(.2, .72), xlabel='Recall / sensitivity', ylabel='Precision / PPV',
           title='Observed trade-offs at fixed boundaries; no threshold optimization')
    save(fig, 'operating_points')

    diag = pd.read_csv(src / 'model_comparison/aggregated_feature_diagnostics.csv')
    matrix = diag.pivot(index='source_feature', columns='model', values='relative_importance')
    assert matrix.shape == (20, 6) and np.allclose(matrix.sum(), 1)
    fig, ax = plt.subplots(figsize=(9, 8), layout='constrained')
    im = ax.imshow(matrix, aspect='auto', cmap='cividis')
    ax.set_xticks(range(6), matrix.columns, rotation=35, ha='right')
    ax.set_yticks(range(20), matrix.index)
    ax.set_title('Within-model diagnostics only; coefficients and tree importance differ')
    fig.colorbar(im, ax=ax, label='Within-model relative magnitude (not causal)')
    save(fig, 'feature_diagnostics')
    result = {'source_prediction_sha256': manifest['prediction_sha256'],
              'model_refitting': False, 'threshold_tuning': False,
              'csv_hash_convention': 'SHA-256 of bytes with CRLF normalized to LF',
              'outputs_sha256': {p.name: hashlib.sha256(p.read_bytes()).hexdigest() for p in dest.iterdir() if p.is_file()}}
    (Q / 'astra_figure_manifest.json').write_text(json.dumps(result, indent=2)+'\n')
    print(json.dumps(result, indent=2))


if __name__ == '__main__':
    main()
