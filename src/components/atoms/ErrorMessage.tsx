// Role: Component (Atom)
// Purpose: Error message display

import { Alert, AlertProps } from '@mui/material';

interface ErrorMessageProps extends Omit<AlertProps, 'severity'> {
  message: string;
}

export function ErrorMessage({ message, ...props }: ErrorMessageProps) {
  return (
    <Alert severity="error" {...props}>
      {message}
    </Alert>
  );
}

