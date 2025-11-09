// Role: Container
// Purpose: Checkout flow with Razorpay payment

'use client';

import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Divider,
  Alert,
} from '@mui/material';
import { useCart } from '@/hooks/useCart';
import { useCheckout } from '@/hooks/useCheckout';
import { Button } from '@/components/atoms/Button';
import { formatCurrency } from '@/utils/formatCurrency';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function CheckoutContainer() {
  const { data: session } = useSession();
  const { items, total, currency } = useCart();
  const { processPayment, loading, error } = useCheckout();
  const router = useRouter();

  const [email, setEmail] = useState(session?.user?.email || '');
  const [name, setName] = useState(session?.user?.name || '');

  if (items.length === 0) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Your cart is empty
        </Typography>
        <Button onClick={() => router.push('/products')}>
          Browse Products
        </Button>
      </Container>
    );
  }

  const handleCheckout = async () => {
    if (!email || !name) {
      return;
    }

    const success = await processPayment(email, name);
    if (success) {
      router.push('/orders?success=true');
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Checkout
      </Typography>

      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { md: '2fr 1fr' } }}>
        <Box>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Full Name"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
          </Paper>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
        </Box>

        <Paper sx={{ p: 3, height: 'fit-content' }}>
          <Typography variant="h5" gutterBottom>
            Order Summary
          </Typography>
          <Divider sx={{ my: 2 }} />
          
          {items.map((item) => (
            <Box key={item.id} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">
                  {item.name} x {item.quantity}
                </Typography>
                <Typography variant="body2">
                  {formatCurrency(item.price * item.quantity, item.currency)}
                </Typography>
              </Box>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6" color="primary">
              {formatCurrency(total, currency)}
            </Typography>
          </Box>
          
          <Button
            fullWidth
            onClick={handleCheckout}
            disabled={loading || !email || !name}
          >
            {loading ? 'Processing...' : 'Pay with Razorpay'}
          </Button>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
            Secure payment powered by Razorpay
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

