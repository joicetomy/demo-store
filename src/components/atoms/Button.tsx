// Role: Component (Atom)
// Purpose: Reusable button component

import { Button as MuiButton, ButtonProps } from '@mui/material';

export function Button(props: ButtonProps) {
  return <MuiButton variant="contained" {...props} />;
}

