import { messageHandlers } from '../handlers/message-handlers';
import { formatSummary } from '../utils/format-summary';

export const enableSummary = (
  text: string,
  summaryOutput: HTMLElement,
  copyBtn: HTMLButtonElement,
  exportBtn: HTMLButtonElement
): void => {
  const summarizeBtn = document.getElementById(
    'summarize-btn'
  ) as HTMLButtonElement;

  summarizeBtn.disabled = false;
  summarizeBtn.addEventListener('click', async () => {
    try {
      summarizeBtn.classList.add('loading');
      const response = await messageHandlers.generateSummary(text);

      if (response.result) {
        summaryOutput.textContent = response.result;
      }

      copyBtn.disabled = false;
      exportBtn.disabled = false;
    } catch (error) {
      console.error('Error generating summary:', error);
      summaryOutput.textContent = 'Error generating summary';
    }
  });
};
