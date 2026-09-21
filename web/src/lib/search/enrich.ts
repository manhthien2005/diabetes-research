import type { NormalizedPaper } from './types';

// Làm giàu metadata từ abstract — vì các API không cho sẵn code/dataset.
// Đây là cách để filter "có code / có dataset" hoạt động thực sự.

const GITHUB_RE =
  /github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+/i;

// Dataset hay gặp trong domain đái tháo đường (tabular/EHR).
const DATASET_PATTERNS: { slug: string; re: RegExp }[] = [
  { slug: 'pima-indians-diabetes', re: /\bpima(\s+indians?)?\b/i },
  { slug: 'nhanes', re: /\bnhanes\b/i },
  { slug: 'mimic', re: /\bmimic[\s-]?(iii|iv|3|4)?\b/i },
  { slug: 'eicu', re: /\beicu\b/i },
  { slug: 'brfss', re: /\bbrfss\b|behavioral risk factor/i },
  { slug: 'frankfurt-diabetes', re: /\bfrankfurt\b.*diabet/i },
  { slug: 'sylhet-diabetes', re: /\bsylhet\b/i },
  { slug: 'uci-early-diabetes', re: /early[-\s]?stage diabetes/i },
  { slug: 'diabetes-130-us-hospitals', re: /130[\s-]?us hospitals|diabetes 130/i },
];

/** Trả về github URL đầu tiên tìm thấy trong text (kèm https). */
function findGithub(text: string): string | null {
  const m = GITHUB_RE.exec(text);
  if (!m) return null;
  let url = m[0].replace(/[.,);]+$/, '');
  return `https://${url}`;
}

function findDatasets(text: string): string[] {
  const found = new Set<string>();
  for (const { slug, re } of DATASET_PATTERNS) {
    if (re.test(text)) found.add(slug);
  }
  return [...found];
}

/** Làm giàu 1 paper tại chỗ: suy code_url + datasets từ title+abstract nếu thiếu. */
export function enrichPaper<T extends NormalizedPaper>(p: T): T {
  const text = `${p.title} ${p.abstract ?? ''}`;
  if (!p.code_url) {
    const gh = findGithub(text);
    if (gh) p.code_url = gh;
  }
  if (p.datasets.length === 0) {
    const ds = findDatasets(text);
    if (ds.length) p.datasets = ds;
  }
  return p;
}
