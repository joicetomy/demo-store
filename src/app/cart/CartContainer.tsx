// Role: Container
// Purpose: Shopping cart management

'use client';

import { Container, Typography, Box, Paper, Divider } from '@mui/material';
import { useCart } from '@/hooks/useCart';
import { CartItem as CartItemComponent } from '@/components/molecules/CartItem';
import { Button } from '@/components/atoms/Button';
import { formatCurrency } from '@/utils/formatCurrency';
import { useRouter } from 'next/navigation';

export default function CartContainer() {
  const { items, total, currency, updateQuantity, removeItem } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Your cart is empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Add some products to get started!
        </Typography>
        <Button onClick={() => router.push('/products')}>
          Browse Products
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Shopping Cart
      </Typography>

      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { md: '2fr 1fr' } }}>
        <Box>
          {items.map((item) => (
            <CartItemComponent
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </Box>

        <Paper sx={{ p: 3, height: 'fit-content' }}>
          <Typography variant="h5" gutterBottom>
            Order Summary
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body1">Items ({items.length})</Typography>
            <Typography variant="body1">{formatCurrency(total, currency)}</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6" color="primary">
              {formatCurrency(total, currency)}
            </Typography>
          </Box>
          <Button fullWidth onClick={() => router.push('/checkout')}>
            Proceed to Checkout
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

