// pdfjs-dist xuất types ở entry chính, nhưng ta import runtime từ build/pdf.mjs
// (bản ESM, tránh cảnh báo "legacy build"). Map declaration sang entry chính.
declare module 'pdfjs-dist/build/pdf.mjs' {
  export * from 'pdfjs-dist';
}
