import type { SourceConnector } from './types';
import { arxivConnector } from './connectors/arxiv';
import { openalexConnector } from './connectors/openalex';
import { semanticScholarConnector } from './connectors/semanticscholar';
import { crossrefConnector } from './connectors/crossref';
import { pubmedConnector } from './connectors/pubmed';
import { coreConnector } from './connectors/core';
import { springerConnector } from './connectors/springer';

// Đăng ký connector built-in. Thêm nguồn mới = thêm 1 dòng ở đây
// (kiến trúc plug-in, "không giới hạn nguồn").
export const CONNECTORS: SourceConnector[] = [
  arxivConnector,
  openalexConnector,
  semanticScholarConnector,
  crossrefConnector,
  pubmedConnector,
  coreConnector,
  springerConnector,
];

export function getConnector(id: string): SourceConnector | undefined {
  return CONNECTORS.find((c) => c.id === id);
}

export function allConnectorIds(): string[] {
  return CONNECTORS.map((c) => c.id);
}
