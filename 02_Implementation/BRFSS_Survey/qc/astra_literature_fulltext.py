import requests, pathlib, bs4, json, hashlib
from concurrent.futures import ThreadPoolExecutor
p=pathlib.Path(__file__).resolve().parent/'astra_literature_sources'
p.mkdir(parents=True, exist_ok=True)
sources={
 'nayem_full':'https://www.nature.com/articles/s41598-026-46927-7',
 'aich_full':'https://www.nature.com/articles/s41598-026-41874-9',
 'ullah_full':'https://pmc.ncbi.nlm.nih.gov/articles/PMC9536939/',
 'li_full':'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0311222',
 'majcherek_full':'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0328655',
 'cdc_2025':'https://www.cdc.gov/brfss/annual_data/annual_2025.html',
 'probast_full':'https://pmc.ncbi.nlm.nih.gov/articles/PMC11931409/',
 'xie_full':'https://www.cdc.gov/pcd/issues/2019/19_0109.htm',
 'muhammad_pdf':'https://journals.sagepub.com/doi/pdf/10.1177/21501319251400546?download=true',
 'tripod_supplement':'https://www.tripod-statement.org/wp-content/uploads/2024/04/TRIPODAI-Supplement.pdf',
}
def fetch(kv):
 k,u=kv
 try:
  r=requests.get(u,timeout=40); r.raise_for_status()
  if r.content.startswith(b'%PDF'):
   (p/(k+'.pdf')).write_bytes(r.content)
   return dict(key=k,url=u,status=r.status_code,bytes=len(r.content),sha256=hashlib.sha256(r.content).hexdigest())
  (p/(k+'.html')).write_text(r.text,encoding='utf-8')
  t=bs4.BeautifulSoup(r.text,'html.parser').get_text('\n',strip=True)
  (p/(k+'.txt')).write_text(t,encoding='utf-8')
  return dict(key=k,url=u,status=r.status_code,chars=len(t),sha256=hashlib.sha256(r.content).hexdigest(),requires_content_verification=True)
 except Exception as e: return dict(key=k,url=u,status='UNVERIFIED',error=str(e))
out=list(ThreadPoolExecutor(max_workers=4).map(fetch,sources.items()))
(p.parent/'astra_literature_retrieval.json').write_text(json.dumps(out,indent=2),encoding='utf-8')
print(json.dumps(out,indent=2))
