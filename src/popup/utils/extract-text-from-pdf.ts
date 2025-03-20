import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'worker/pdf.worker.min.mjs';

export async function extractTextFromPDF(
  source: string | File
): Promise<string> {
  let pdf;

  if (typeof source === 'string') {
    pdf = await pdfjsLib.getDocument(source).promise;
  } else {
    const arrayBuffer = await source.arrayBuffer();
    pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
  }

  let text = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item: any) => item.str).join(' ') + '\n';
  }

  return text;
}
