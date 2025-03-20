import { extractTextFromPDF } from './utils/extract-text-from-pdf';
import { enableSummary } from './view/enable-summary';
import { copyToClipboard } from './utils/copy-to-clipboard';
import { exportToTxt } from './utils/export-to-txt';
import { checkActiveTab } from './handlers/message-handlers';

document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('file-input') as HTMLInputElement;
  const fileStatus = document.getElementById('file-status') as HTMLSpanElement;
  const copyBtn = document.getElementById('copy-btn') as HTMLButtonElement;
  const exportBtn = document.getElementById('export-btn') as HTMLButtonElement;
  const summaryOutput = document.getElementById(
    'summary-output'
  ) as HTMLDivElement;

  checkActiveTab().then((response) => {
    if (response.isPdf && response.url) {
      fileStatus.textContent = 'Loading PDF from URL...';
      extractTextFromPDF(response.url)
        .then((text) => {
          fileStatus.textContent = 'PDF from URL loaded';
          enableSummary(text, summaryOutput, copyBtn, exportBtn);
        })
        .catch((error) => {
          console.error('Error loading PDF from URL:', error);
          fileStatus.textContent = 'Error loading PDF from URL';
        });
    }
  });

  fileInput.addEventListener('change', async () => {
    const file = fileInput.files?.[0];

    if (file) {
      try {
        const text = await extractTextFromPDF(file);
        fileStatus.textContent = `Selected: ${file.name}`;
        enableSummary(text, summaryOutput, copyBtn, exportBtn);
      } catch (error) {
        console.error('Error loading local PDF:', error);
        fileStatus.textContent = 'Error loading file';
      }
    } else {
      fileStatus.textContent = 'No File Selected';
    }
  });

  copyBtn.addEventListener('click', () => {
    if (summaryOutput.textContent) {
      copyToClipboard(summaryOutput.textContent);
      alert('Summary copied to clipboard!');
    }
  });

  exportBtn.addEventListener('click', () => {
    if (summaryOutput.textContent) {
      exportToTxt(summaryOutput.textContent, 'summary');
    }
  });
});
