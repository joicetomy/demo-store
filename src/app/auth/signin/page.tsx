// Role: Page
// Purpose: Sign in page

'use client';

import { Container, Paper, Typography, Box } from '@mui/material';
import { Button } from '@/components/atoms/Button';
import { signIn } from 'next-auth/react';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function SignInPage() {
  return (
    <Container sx={{ py: 8 }}>
      <Paper sx={{ maxWidth: 400, mx: 'auto', p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          Sign In
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
          Choose your preferred sign in method
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={() => signIn('google', { callbackUrl: '/products' })}
          >
            Continue with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GitHubIcon />}
            onClick={() => signIn('github', { callbackUrl: '/products' })}
          >
            Continue with GitHub
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

