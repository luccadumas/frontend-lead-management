import { useState, useCallback } from 'react';

interface ErrorState {
  message: string;
  status?: number;
  data?: unknown;
}

export const useErrorHandler = () => {
  const [error, setError] = useState<ErrorState | null>(null);

  const handleError = useCallback((error: unknown) => {
    if (error instanceof Error) {
      setError({
        message: error.message,
        status: (error as { status?: number }).status,
        data: (error as { data?: unknown }).data,
      });
    } else {
      setError({
        message: 'An unexpected error occurred',
      });
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError,
  };
}; 
