export function handleError(error: unknown): { errorMessage: string } {
  if (error instanceof Error) {
    return { errorMessage: error.message };
  }
  return { errorMessage: 'An unexpected error occurred' };
}
