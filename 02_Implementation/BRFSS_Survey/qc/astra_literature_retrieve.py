"""Independent, read-only primary-source retrieval for the Astra audit."""
import concurrent.futures
import hashlib
import json
import pathlib
import urllib.request
import urllib.parse

ROOT = pathlib.Path(__file__).resolve().parent
OUT = ROOT / 'astra_literature_sources'
OUT.mkdir(exist_ok=True)
records = json.loads((ROOT/'astra_literature_run/qc/reference_audit.json').read_text(encoding='utf-8'))['records']

def retrieve(rec):
    url = 'https://api.crossref.org/works/' + urllib.parse.quote(rec['doi'], safe='')
    req = urllib.request.Request(url, headers={'User-Agent': 'ResearchBibliographyAudit/1.0'})
    try:
        data = urllib.request.urlopen(req, timeout=40).read()
        (OUT/(rec['ref_id']+'_crossref.json')).write_bytes(data)
        m = json.loads(data)['message']
        return {'key': rec['ref_id'], 'url': url, 'sha256': hashlib.sha256(data).hexdigest(),
                'title': m.get('title'), 'subtitle': m.get('subtitle'), 'authors': m.get('author'),
                'container_title': m.get('container-title'), 'volume': m.get('volume'),
                'issue': m.get('issue'), 'page': m.get('page'), 'article_number': m.get('article-number'),
                'published': m.get('published'), 'published_online': m.get('published-online'),
                'published_print': m.get('published-print'), 'relation': m.get('relation'),
                'update_to': m.get('update-to'), 'primary_links': m.get('link'), 'status': 'retrieved'}
    except Exception as e:
        return {'key':rec['ref_id'], 'url':url, 'status':'UNVERIFIED', 'error':str(e)}

with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:
    result=list(ex.map(retrieve,records))
(ROOT/'astra_literature_crossref_metadata.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
for r in result:
    print(r['key'],r['status'], r.get('published'),r.get('volume'),r.get('page'),r.get('article_number'),r.get('update_to'))
