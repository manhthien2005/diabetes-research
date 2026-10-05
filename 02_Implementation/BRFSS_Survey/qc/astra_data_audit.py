"""Independent read-only BRFSS data audit; writes aggregate evidence only.

Run from repository root: python -X utf8 02_Implementation/BRFSS_Survey/qc/astra_data_audit.py
Resolves Git LFS pointers using the shared repository object store. Does not
hydrate, modify, or persist participant-level data. Downloads CDC ZIP in memory.
"""
from pathlib import Path
import ast
import hashlib
import io
import json
import re
import struct
import subprocess
import zipfile
from datetime import datetime, timezone

import numpy as np
import pandas as pd
import requests
from bs4 import BeautifulSoup
from sklearn.model_selection import train_test_split

ROOT = Path(__file__).resolve().parents[3]
STUDY = ROOT / "02_Implementation/BRFSS_Survey"
OUT = STUDY / "qc/astra_data_evidence.json"
URL = "https://www.cdc.gov/brfss/annual_data/2025/files/LLCP2025XPT.zip"
CODEBOOK = "https://www.cdc.gov/brfss/annual_data/2025/zip/codebook25_llcp-v2-508.zip"
LAYOUT = "https://www.cdc.gov/brfss/annual_data/2025/llcp_varlayout_25_onecolumn.html"


def digest(path):
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(8 * 1024**2), b""):
            h.update(chunk)
    return h.hexdigest()


def resolve(rel):
    p = STUDY / rel
    if p.stat().st_size < 200:
        pointer = p.read_text(encoding='utf-8')
        oid = re.search(r"oid sha256:(\w+)", pointer).group(1)
        common = subprocess.check_output(["git", "rev-parse", "--git-common-dir"], cwd=ROOT, text=True).strip()
        p = (ROOT / common).resolve() / "lfs/objects" / oid[:2] / oid[2:4] / oid
    return p


def counts(series):
    return {"MISSING" if pd.isna(k) else str(k): int(v) for k, v in series.value_counts(dropna=False).sort_index().items()}


def main():
    result = {"timestamp_utc": datetime.now(timezone.utc).isoformat(), "head": subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=ROOT, text=True).strip(), "scope": "read-only aggregate audit; no model training"}
    xpt = resolve("data/extracted/LLCP2025.XPT")
    local_zip = resolve("data/raw/LLCP2025XPT.zip")
    result["local_files"] = {str(p): {"bytes": p.stat().st_size, "sha256": digest(p)} for p in (xpt, local_zip)}
    print("Local hashes verified", flush=True)
    response = requests.get(URL, timeout=(30, 180))
    response.raise_for_status()
    remote_bytes = response.content
    result["official_zip"] = {"url": response.url, "http_status": response.status_code, "bytes": len(remote_bytes), "sha256": hashlib.sha256(remote_bytes).hexdigest(), "matches_local": hashlib.sha256(remote_bytes).hexdigest() == digest(local_zip)}
    with zipfile.ZipFile(io.BytesIO(remote_bytes)) as z:
        result["official_zip"]["members"] = [{"filename": i.filename, "bytes": i.file_size, "crc": i.CRC} for i in z.infolist()]
        h = hashlib.sha256()
        with z.open(z.namelist()[0]) as f:
            for b in iter(lambda: f.read(8*1024**2), b""):
                h.update(b)
        result["official_zip"]["uncompressed_xpt_sha256"] = h.hexdigest()
        result["official_zip"]["uncompressed_matches_local"] = h.hexdigest() == digest(xpt)
    del remote_bytes, response
    print("Official CDC ZIP compared", flush=True)

    with xpt.open("rb") as f:
        header = f.read(640)
        name_record = header[560:640]
        nvars = int(name_record[54:58])
        descriptors = [f.read(140) for _ in range(nvars)]
    raw_names = [b[8:16].decode().strip() for b in descriptors]
    widths = [struct.unpack(">h", b[4:6])[0] for b in descriptors]
    obs_start = 640 + ((140*nvars + 79)//80)*80 + 80
    record_width = sum(widths)
    raw_rows = (xpt.stat().st_size-obs_start)//record_width
    result["xpt_header"] = {"namestr_record": name_record.decode(), "declared_variable_count": nvars, "descriptor_names": raw_names, "duplicate_names": len(raw_names)-len(set(raw_names)), "record_width_bytes": record_width, "observation_start_bytes": obs_start, "rows_by_file_length": raw_rows, "trailing_padding_bytes": (xpt.stat().st_size-obs_start)%record_width, "creation_header": header[80:240].decode().strip()}

    cb_response = requests.get(CODEBOOK, timeout=60)
    cb_response.raise_for_status()
    with zipfile.ZipFile(io.BytesIO(cb_response.content)) as z:
        cb_member = z.namelist()[0]
        cb_html = z.read(cb_member)
    soup = BeautifulSoup(cb_html, "html.parser")
    fulltext = soup.get_text(" ", strip=True)
    codebook_names = re.findall(r"SAS Variable Name:\s*([A-Za-z0-9_]+)", fulltext)
    result["codebook"] = {"url": CODEBOOK, "zip_sha256": hashlib.sha256(cb_response.content).hexdigest(), "member": cb_member, "html_sha256": hashlib.sha256(cb_html).hexdigest(), "distinct_variable_count": len(set(codebook_names)), "absent_from_xpt": sorted(set(codebook_names)-set(raw_names)), "absent_from_codebook": sorted(set(raw_names)-set(codebook_names))}
    layout_response = requests.get(LAYOUT, timeout=60)
    layout_response.raise_for_status()
    layout_soup = BeautifulSoup(layout_response.text, "html.parser")
    layout_names = []
    for row in layout_soup.select("tr"):
        cells = row.find_all("td")
        if len(cells)==3 and cells[0].get_text(strip=True).isdigit():
            layout_names.append(cells[1].get_text(strip=True))
    result["layout"] = {"url": LAYOUT, "count": len(layout_names), "absent_from_xpt": sorted(set(layout_names)-set(raw_names)), "absent_from_layout": sorted(set(raw_names)-set(layout_names))}

    df = pd.read_sas(xpt, format="xport", encoding="utf-8")
    result["parsed"] = {"pandas_version": pd.__version__, "shape": list(df.shape), "columns_match_raw_header_in_order": df.columns.tolist()==raw_names, "exact_duplicate_rows": int(df.duplicated().sum())}
    result["target_counts"] = counts(df.DIABETE4)
    cohort = df[df.DIABETE4.isin([1,3])]
    result["cohort"] = {"rows": len(cohort), "positive": int((cohort.DIABETE4==1).sum()), "negative": int((cohort.DIABETE4==3).sum()), "excluded": len(df)-len(cohort), "unweighted_positive_proportion": float((cohort.DIABETE4==1).mean())}
    for key, subset in [("all", df), ("cohort", cohort)]:
        result.setdefault("identifiers", {})[key] = {"SEQNO_duplicate_rows": int(subset.duplicated(["SEQNO"]).sum()), "state_SEQNO_duplicate_rows": int(subset.duplicated(["_STATE", "SEQNO"]).sum()), "PSU_duplicate_rows": int(subset.duplicated(["_PSU"]).sum()), "state_PSU_duplicate_rows": int(subset.duplicated(["_STATE", "_PSU"]).sum()), "missing": {c:int(subset[c].isna().sum()) for c in ["SEQNO","_STATE","_PSU","_STSTR","_LLCPWT"]}}
        result.setdefault("jurisdictions", {})[key] = counts(subset._STATE)
        result.setdefault("survey", {})[key] = {"weight_min": float(subset._LLCPWT.min()), "weight_max": float(subset._LLCPWT.max()), "weight_nonpositive": int((subset._LLCPWT<=0).sum()), "strata": int(subset._STSTR.nunique()), "state_psu_groups": int(subset.groupby(["_STATE","_PSU"]).ngroups), "weighted_positive_proportion_descriptive_only": float(np.average(subset.DIABETE4.eq(1),weights=subset._LLCPWT))}

    notebook = json.loads((STUDY/"kaggle/notebook/BRFSS_2025_Diabetes_Classification.ipynb").read_text(encoding="utf-8"))
    ns = {"pd":pd, "np":np}
    retained = []
    for cell in notebook["cells"]:
        if cell["cell_type"] != "code": continue
        tree = ast.parse("".join(cell["source"]))
        for node in tree.body:
            if isinstance(node, ast.Assign) and any(isinstance(t,ast.Name) and t.id=="PRIMARY_FEATURES" for t in node.targets): retained.append(node)
            elif isinstance(node, ast.FunctionDef) and node.name in ["keep_codes", "recode_brfss_2025"]: retained.append(node)
    exec(compile(ast.Module(body=retained,type_ignores=[]),"notebook_selected_recoding_only","exec"),ns)
    features = ns["PRIMARY_FEATURES"]
    X = ns["recode_brfss_2025"](cohort)
    y = cohort.DIABETE4.eq(1).astype(int)
    all_X = ns["recode_brfss_2025"](df)
    result["predictors"] = {}
    for col in features:
        marker = re.search(r"SAS Variable Name:\s*"+re.escape(col)+r"\b",fulltext)
        start = fulltext.rfind("Label:",0,marker.start()) if marker else -1
        stop = fulltext.find("Label:",marker.end()) if marker else -1
        result["predictors"][col] = {"source_codebook_excerpt": fulltext[start:stop], "raw_missing_all":int(df[col].isna().sum()), "analytical_missing_all": int(all_X[col].isna().sum()), "analytical_missing_cohort":int(X[col].isna().sum()), "analytical_missing_pct_cohort":float(X[col].isna().mean()*100), "raw_values_cohort":counts(cohort[col]) if col!="_BMI5" else {"min":float(cohort[col].min()),"max":float(cohort[col].max())}, "analytical_min":float(X[col].min()), "analytical_max":float(X[col].max())}
    result["complete_cases"] = int(X.notna().all(axis=1).sum())
    result["feature_pattern_duplicates"] = {"X_extra_rows":int(X.duplicated().sum()),"X_y_extra_rows":int(X.assign(target=y).duplicated().sum()),"interpretation":"Matching coarse predictor patterns do not establish duplicate respondents; use state+SEQNO."}
    train_idx, test_idx = train_test_split(np.arange(len(X)),test_size=.2,random_state=42,stratify=y)
    result["split"] = {"train_n":len(train_idx),"test_n":len(test_idx),"train_positive":int(y.iloc[train_idx].sum()),"test_positive":int(y.iloc[test_idx].sum())}
    ids = cohort[["_STATE","SEQNO"]].astype(str).agg("|".join,axis=1)
    result["split"]["state_SEQNO_overlap"] = len(set(ids.iloc[train_idx]) & set(ids.iloc[test_idx]))
    hx = pd.util.hash_pandas_object(X,index=False)
    result["split"]["test_rows_predictor_pattern_in_training"] = int(hx.iloc[test_idx].isin(set(hx.iloc[train_idx])).sum())
    characteristics = []
    for partition, ix in [("cohort",np.arange(len(X))),("train",train_idx),("test",test_idx)]:
        for col in features:
            s = X.iloc[ix][col]
            base = {"partition":partition,"variable":col,"n":len(s),"missing_n":int(s.isna().sum()),"missing_pct":float(s.isna().mean()*100)}
            if col in ["_BMI5","PHYSHLTH","MENTHLTH","SLEPTIM1"]:
                characteristics.append({**base,"category":"continuous","category_n":None,"category_pct":None,"mean":s.mean(),"sd":s.std(),"median":s.median(),"q25":s.quantile(.25),"q75":s.quantile(.75),"min":s.min(),"max":s.max()})
            else:
                for category, n in s.value_counts(dropna=False).sort_index().items():
                    characteristics.append({**base,"category":"MISSING" if pd.isna(category) else category,"category_n":int(n),"category_pct":float(n/len(s)*100)})
        for category, n in y.iloc[ix].value_counts().sort_index().items():
            characteristics.append({"partition":partition,"variable":"target_diabetes","n":len(ix),"missing_n":0,"missing_pct":0,"category":int(category),"category_n":int(n),"category_pct":float(n/len(ix)*100)})
    pd.DataFrame(characteristics).to_csv(STUDY/"qc/astra_data_characteristics.csv",index=False)
    prediction_path = STUDY/"qc/astra_statistics_source/model_comparison/paired_test_predictions.csv.gz"
    if prediction_path.exists():
        prediction = pd.read_csv(prediction_path)
        result["frozen_prediction_identity"] = {"path":str(prediction_path.relative_to(ROOT)),"columns":prediction.columns.tolist(),"n":len(prediction),"test_row_id_matches_in_order":bool(np.array_equal(prediction.test_row_id.to_numpy(),cohort.index.to_numpy()[test_idx])),"y_true_matches_in_order":bool(np.array_equal(prediction.y_true.to_numpy(),y.iloc[test_idx].to_numpy()))}
    result["audit_notes"] = ["No participant-level rows or identifiers persisted.","No frozen files or parameters modified.","All codebook excerpts sourced directly from official CDC ZIP.","Notebook recoder dynamically extracted with AST; only feature constant and two recoding functions executed."]
    OUT.write_text(json.dumps(result,indent=2,ensure_ascii=False,allow_nan=False)+"\n",encoding="utf-8")
    print(json.dumps({k:result[k] for k in ["official_zip","parsed","codebook","layout","target_counts","cohort","complete_cases","identifiers","split"]},indent=2),flush=True)


if __name__ == "__main__":
    main()
