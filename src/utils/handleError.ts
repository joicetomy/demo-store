// Role: Utility
// Purpose: Centralized error handling and logging

export function handleError(error: unknown): string {
  if (error instanceof Error) {
    console.error('Error:', error.message);
    return error.message;
  }
  
  if (typeof error === 'string') {
    console.error('Error:', error);
    return error;
  }
  
  console.error('Unknown error:', error);
  return 'An unexpected error occurred';
}

