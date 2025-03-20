export function formatSummary(theme: string, takeaways: string[]): string {
  return `Document Theme: ${theme}\nKey Takeaways:\n- ${takeaways.join(
    '\n- '
  )}`;
}
