"""Independent read-only audit of frozen respondent predictions; never fits a predictor.

Usage: python qc/astra_statistics_audit.py --source qc/astra_statistics_source
Weighted rank calculations are validated against sklearn on duplicated bootstrap rows.
Bootstrap count weights preserve class sizes and shared respondent pairing exactly.
Calibration diagnostics estimate only outcome-on-frozen-score regressions; predictions
are never changed. Source artifact remains immutable.
"""
import argparse
import hashlib
import itertools
import json
import platform
from pathlib import Path
import time

import numpy as np
import pandas as pd
import scipy
from scipy.special import expit, logit
from scipy.optimize import brentq
from scipy.stats import binomtest
import sklearn
from sklearn.metrics import (roc_auc_score, average_precision_score,
                             precision_recall_curve, auc)

MODELS = ['logistic_regression', 'decision_tree', 'random_forest',
          'gradient_boosting', 'xgboost', 'linear_svm', 'gaussian_naive_bayes']
METRICS = ['accuracy','balanced_accuracy','precision','recall','specificity',
           'f1','roc_auc','pr_auc','brier_score']
TOP = ['logistic_regression','gradient_boosting','xgboost','linear_svm']

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def clean(obj):
    if isinstance(obj, dict): return {str(k):clean(v) for k,v in obj.items()}
    if isinstance(obj, (list,tuple)): return [clean(v) for v in obj]
    if isinstance(obj, np.generic): return clean(obj.item())
    if isinstance(obj,float) and not np.isfinite(obj): return None
    return obj

class FrozenMetric:
    def __init__(self,y,pred,score,probability):
        self.y=y; self.pred=pred; self.score=score; self.probability=probability
        self.order=np.argsort(-score,kind='stable')
        ordered=score[self.order]
        self.starts=np.r_[0,np.flatnonzero(ordered[1:]!=ordered[:-1])+1]
        self.ys=y[self.order]
        self.cells=2*y+pred
        self.error2=(score-y)**2

    def rank(self,w):
        sw=w[self.order]
        pos=np.add.reduceat(sw*self.ys,self.starts)
        neg=np.add.reduceat(sw*(1-self.ys),self.starts)
        cp=np.cumsum(pos); cn=np.cumsum(neg)
        # Descending scores: each negative pairs with earlier positives plus half ties.
        ra=np.sum(neg*(cp-0.5*pos))/(cp[-1]*cn[-1])
        denom=cp+cn
        ap=np.sum(pos*np.divide(cp,denom,out=np.zeros_like(cp,dtype=float),where=denom>0))/cp[-1]
        return ra,ap

    def all(self,w):
        tn,fp,fn,tp=np.bincount(self.cells,weights=w,minlength=4)
        rec=tp/(tp+fn); spec=tn/(tn+fp)
        ra,ap=self.rank(w)
        vals=[(tn+tp)/w.sum(),(rec+spec)/2,tp/(tp+fp) if tp+fp else 0,
              rec,spec,2*tp/(2*tp+fp+fn),ra,ap,
              np.dot(w,self.error2)/w.sum() if self.probability else np.nan]
        return np.array(vals)

def weights(rng,pos,neg,n,shuffle=True):
    ix=np.r_[rng.choice(pos,len(pos),replace=True),rng.choice(neg,len(neg),replace=True)]
    if shuffle: rng.shuffle(ix)
    return np.bincount(ix,minlength=n),ix

def calibration(y,p,eps):
    z=logit(np.clip(p,eps,1-eps))
    x=np.column_stack([np.ones(len(y)),z]); beta=np.array([logit(y.mean()),0.0])
    for iteration in range(100):
        mu=expit(x@beta); v=mu*(1-mu)
        h=x.T@(v[:,None]*x); step=np.linalg.solve(h,x.T@(y-mu))
        beta+=step
        if abs(step).max()<1e-11: break
    mu=expit(x@beta); h=x.T@((mu*(1-mu))[:,None]*x)
    se=np.sqrt(np.diag(np.linalg.inv(h)))
    citl=brentq(lambda a: np.sum(y-expit(a+z)),-100,100,xtol=1e-13)
    return dict(epsilon=eps,calibration_intercept=beta[0],calibration_slope=beta[1],
                calibration_intercept_se=se[0],calibration_slope_se=se[1],
                calibration_in_the_large= citl, iterations=iteration+1,
                score_equation_max_abs=float(abs(x.T@(y-mu)).max()))

def main():
    parser=argparse.ArgumentParser(); parser.add_argument('--source',type=Path,required=True)
    parser.add_argument('--seeds',default='20251010,42,20261004')
    args=parser.parse_args(); src=args.source.resolve(); out=Path(__file__).parent
    repo=out.parents[2]; supplement=repo/'03_Final_Result/BRFSS_2025/supplement'
    path=src/'model_comparison/paired_test_predictions.csv.gz'
    df=pd.read_csv(path,float_precision='round_trip'); y=df.y_true.to_numpy(); n=len(y)
    pos=np.flatnonzero(y==1); neg=np.flatnonzero(y==0); ones=np.ones(n)
    report={'source':str(path),'source_sha256':digest(path),'n':n,
            'positive_n':len(pos),'negative_n':len(neg),
            'versions':dict(python=platform.python_version(),numpy=np.__version__,pandas=pd.__version__,
                            scipy=scipy.__version__,sklearn=sklearn.__version__),
            'pairing':dict(unique_test_row_id=bool(df.test_row_id.is_unique),
                           missing_cells=int(df.isna().sum().sum()),
                           label_values=np.unique(y).tolist()),
            'artifact_manifest':json.loads((src/'model_comparison/comparison_manifest.json').read_text(encoding='utf-8')),
            'source_files_sha256':{str(p.relative_to(src)):digest(p) for p in src.rglob('*') if p.is_file()},
            'models':{},'validation':{}}
    engines={m:FrozenMetric(y,df[m+'_pred'].to_numpy(),df[m+'_score'].to_numpy(),m!='linear_svm') for m in MODELS}
    rows=[]
    for i,m in enumerate(MODELS):
        e=engines[m]; vals=e.all(ones); counts=np.bincount(e.cells,minlength=4)
        point=json.loads((src/f'model_{i+1:02}_{m}/test_point_metrics.json').read_text(encoding='utf-8'))
        errors={k:abs(vals[j]-point[k]) for j,k in enumerate(METRICS) if point.get(k) is not None}
        pc,rc,_=precision_recall_curve(y,e.score)
        expected_pred=e.score>0 if m=='linear_svm' else e.score>=.5
        report['models'][m]=dict(zip(METRICS,vals))|dict(confusion_matrix=counts.reshape(2,2).tolist(),
            native_threshold_mismatches=int(np.sum(e.pred!=expected_pred)),
            point_max_abs_error=max(errors.values()),trapezoidal_pr_auc=auc(rc,pc),
            sklearn_auc_abs_error=abs(vals[6]-roc_auc_score(y,e.score)),
            sklearn_ap_abs_error=abs(vals[7]-average_precision_score(y,e.score)),
            score_min=e.score.min(),score_max=e.score.max(),
            probability_zero_count=int(np.sum(e.score==0)),probability_one_count=int(np.sum(e.score==1)))
        rows.append(dict(model=m,**dict(zip(METRICS,vals)),tn=counts[0],fp=counts[1],fn=counts[2],tp=counts[3]))
    pd.DataFrame(rows).to_csv(out/'astra_statistics_point_metrics.csv',index=False)
    # Verify rank implementation independently against sklearn for duplicated respondents.
    rng=np.random.default_rng(807); validation=[]
    for _ in range(4):
        w,ix=weights(rng,pos,neg,n)
        for m,e in engines.items():
            ra,ap=e.rank(w)
            validation.extend([abs(ra-roc_auc_score(y[ix],e.score[ix])),abs(ap-average_precision_score(y[ix],e.score[ix]))])
    report['validation']['weighted_ranking_max_abs_error_vs_sklearn']=max(validation)
    assert max(validation)<1e-12
    # Exact McNemar plus independent Holm sort/cumulative-maximum implementation.
    mc=[]
    for a,b in itertools.combinations(MODELS,2):
        ca=engines[a].pred==y; cb=engines[b].pred==y
        ab=int(np.sum(ca&~cb)); ba=int(np.sum(~ca&cb)); dn=ab+ba
        pv=binomtest(ab,dn,.5).pvalue if dn else 1.0
        mc.append(dict(model_a=a,model_b=b,a_correct_b_wrong=ab,a_wrong_b_correct=ba,
                       discordant_n=dn,p_value_exact=pv,accuracy_difference_a_minus_b=(ab-ba)/n))
    order=np.argsort([r['p_value_exact'] for r in mc]); previous=0
    for rank,j in enumerate(order):
        adjusted=min(1,max(previous,mc[j]['p_value_exact']*(len(mc)-rank)))
        mc[j]['p_value_holm']=adjusted; mc[j]['significant_holm_0_05']=adjusted<.05; previous=adjusted
    original=pd.read_csv(src/'model_comparison/mcnemar_pairwise_holm.csv').set_index(['model_a','model_b'])
    maxerr=0
    for row in mc:
        old=original.loc[(row['model_a'],row['model_b'])]
        for k in ['a_correct_b_wrong','a_wrong_b_correct','discordant_n','p_value_exact','p_value_holm']:
            maxerr=max(maxerr,abs(row[k]-old[k]))
    report['validation']['mcnemar_max_abs_error']=maxerr
    report['validation']['mcnemar_holm_significant_count']=sum(r['significant_holm_0_05'] for r in mc)
    pd.DataFrame(mc).to_csv(out/'astra_statistics_mcnemar.csv',index=False)
    # Calibration clipping is intentionally sensitivity-audited; original supplement did not state epsilon.
    cal=[]; origcal=pd.read_csv(supplement/'calibration_intercept_slope.csv').set_index('model_id')
    for m,e in engines.items():
        if not e.probability: continue
        for eps in [1e-6,1e-8,1e-10,1e-15]:
            result=calibration(y,e.score,eps); result['model_id']=m
            result['max_abs_error_vs_supplement']=max(abs(result[k]-origcal.loc[m,k]) for k in ['calibration_intercept','calibration_slope','calibration_intercept_se','calibration_slope_se'])
            cal.append(result)
    pd.DataFrame(cal).to_csv(out/'astra_statistics_calibration.csv',index=False)
    # Reproduce each per-model 200-replicate stream and every stored metric.
    report['validation']['per_model_200_bootstrap']={}
    for i,m in enumerate(MODELS):
        rng=np.random.default_rng(20251003+i); arr=[]
        for _ in range(200):
            w,_=weights(rng,pos,neg,n); arr.append(engines[m].all(w))
        arr=np.array(arr); old=pd.read_csv(src/f'model_{i+1:02}_{m}/bootstrap_metrics.csv')
        errors={k:float(np.max(np.abs(arr[:,j]-old[k]))) for j,k in enumerate(METRICS) if k in old}
        report['validation']['per_model_200_bootstrap'][m]=errors
    print('Point metrics, all 21 McNemar, calibration, per-model 200 bootstrap complete',flush=True)
    rng=np.random.default_rng(20251010); paired=np.empty((200,len(MODELS),len(METRICS)))
    for b in range(200):
        w,_=weights(rng,pos,neg,n)
        for j,m in enumerate(MODELS): paired[b,j]=engines[m].all(w)
    old=pd.read_csv(src/'model_comparison/paired_bootstrap_model_metrics.csv')
    maxerr=0
    for j,m in enumerate(MODELS):
        selected=old[old.model==m].sort_values('replicate')
        for k,metric in enumerate(METRICS):
            if m=='linear_svm' and metric=='brier_score': continue
            maxerr=max(maxerr,float(np.max(np.abs(paired[:,j,k]-selected[metric].to_numpy()))))
    report['validation']['paired_200_bootstrap_max_abs_error']=maxerr
    old=pd.read_csv(src/'model_comparison/paired_bootstrap_differences.csv'); maxerr=0
    for r in old.to_dict('records'):
        j=METRICS.index(r['metric']); diff=paired[:,MODELS.index(r['model_a']),j]-paired[:,MODELS.index(r['model_b']),j]
        maxerr=max(maxerr,abs(np.quantile(diff,.025)-r['ci95_lower']),abs(np.quantile(diff,.975)-r['ci95_upper']))
    report['validation']['paired_200_difference_ci_max_abs_error']=maxerr
    # Reproduce 5000 stream using primary notebook shuffle semantics; examine independent seeds.
    robustness=[]; orig=pd.read_csv(supplement/'top4_paired_bootstrap_5000_robustness.csv')
    for seed in map(int,args.seeds.split(',')):
        start=time.time(); rng=np.random.default_rng(seed); arr=np.empty((5000,4,2))
        for b in range(5000):
            w,_=weights(rng,pos,neg,n)
            for j,m in enumerate(TOP): arr[b,j]=engines[m].rank(w)
        for j,m in enumerate(TOP[1:],1):
            for k,metric in enumerate(['roc_auc','average_precision']):
                diff=arr[:,0,k]-arr[:,j,k]; lo,hi=np.quantile(diff,[.025,.975]); tail=np.mean(diff<=0)
                # Tail proportion describes bootstrap distribution, not a formal null p-value.
                tail_ci=binomtest(int(np.sum(diff<=0)),len(diff)).proportion_ci(confidence_level=.95)
                oldrow=orig[(orig.model_b==m)&(orig.metric==metric)].iloc[0]
                robustness.append(dict(seed=seed,bootstrap_reps=5000,model_a=TOP[0],model_b=m,metric=metric,
                    point_difference_a_minus_b=engines[TOP[0]].rank(ones)[k]-engines[m].rank(ones)[k],
                    ci95_lower=lo,ci95_upper=hi,tail_fraction_le_zero=tail,
                    tail_mc_ci95_lower=tail_ci.low,tail_mc_ci95_upper=tail_ci.high,
                    empirical_two_tail_fraction=min(1,2*min(tail,np.mean(diff>=0))),
                    family6_bonferroni_ci_lower=np.quantile(diff,.05/(2*6)),
                    family6_bonferroni_ci_upper=np.quantile(diff,1-.05/(2*6)),
                    max_ci_abs_difference_vs_original=max(abs(lo-oldrow.ci95_lower),abs(hi-oldrow.ci95_upper))))
        np.savez_compressed(out/f'astra_statistics_bootstrap_{seed}.npz',metrics=arr,models=np.array(TOP),metrics_names=np.array(['roc_auc','average_precision']))
        print(f'5000 paired bootstrap seed={seed} elapsed={time.time()-start:.1f}s',flush=True)
    pd.DataFrame(robustness).to_csv(out/'astra_statistics_robustness.csv',index=False)
    report['robustness']=robustness
    report['calibration_best_match']={m:min((c for c in cal if c['model_id']==m),key=lambda c:c['max_abs_error_vs_supplement']) for m in MODELS if m!='linear_svm'}
    report['caveats']=['Bootstrap intervals condition on frozen fitted models, class counts, and internal sample; do not quantify retraining or survey-design uncertainty.',
                       'Calibration joint intercept is not calibration-in-the-large; the latter fixes slope to one.',
                       'Empirical bootstrap tail fractions are exploratory diagnostics, not prespecified confirmatory p-values.',
                       'The original 5000 bootstrap supplement does not provide generation code, RNG class, shuffle policy, package versions, or prediction hash.']
    (out/'astra_statistics_evidence.json').write_text(json.dumps(clean(report),indent=2),encoding='utf-8')
    print(json.dumps(clean(report['validation']),indent=2),flush=True)

if __name__=='__main__': main()
