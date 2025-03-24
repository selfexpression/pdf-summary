import { messageHandlers } from '../handlers/message-handlers';

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
      summarizeBtn.textContent = '';
      const response = await messageHandlers.generateSummary(text);

      if (response.result) {
        summaryOutput.textContent = response.result;
      }

      summarizeBtn.classList.remove('loading');
      summarizeBtn.textContent = 'Summarize in One Click';
      summarizeBtn.disabled = true;
      copyBtn.disabled = false;
      exportBtn.disabled = false;
    } catch (error) {
      console.error('Error generating summary:', error);
      summaryOutput.textContent = 'Error generating summary';
    }
  });
};
