export const enableSummary = (
  text: string,
  summaryOutput: HTMLElement,
  copyBtn: HTMLButtonElement,
  exportBtn: HTMLButtonElement
): void => {
  const summarizeBtn = document.getElementById('summarize-btn');

  if (summarizeBtn instanceof HTMLButtonElement) {
    summarizeBtn.disabled = false;
    summarizeBtn.onclick = async () => {
      try {
        // const { theme, takeaways } = await generateSummary(text);
        // const summary = formatSummary(theme, takeaways);
        // summaryOutput.textContent = summary;
        copyBtn.disabled = false;
        exportBtn.disabled = false;
      } catch (error) {
        console.error('Error generating summary:', error);
        summaryOutput.textContent = 'Error generating summary';
      }
    };
  }
};
