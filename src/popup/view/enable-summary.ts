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
  summarizeBtn.onclick = async () => {
    try {
      const result = await messageHandlers.generateSummary(text);
      // const summary = formatSummary(theme, takeaways);
      summaryOutput.textContent = result;
      copyBtn.disabled = false;
      exportBtn.disabled = false;
    } catch (error) {
      console.error('Error generating summary:', error);
      summaryOutput.textContent = 'Error generating summary';
    }
  };
};
