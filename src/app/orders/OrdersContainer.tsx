// Role: Container
// Purpose: User orders listing

'use client';

import { Container, Typography, Box, Grid, Alert } from '@mui/material';
import { useOrders } from '@/hooks/useOrders';
import { OrderCard } from '@/components/molecules/OrderCard';
import { Loader } from '@/components/atoms/Loader';
import { ErrorMessage } from '@/components/atoms/ErrorMessage';
import { useSearchParams } from 'next/navigation';

export default function OrdersContainer() {
  const { orders, loading, error } = useOrders();
  const searchParams = useSearchParams();
  const success = searchParams.get('success');

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Container sx={{ py: 4 }}>
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Order placed successfully! Thank you for your purchase.
        </Alert>
      )}

      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          My Orders
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and track your orders
        </Typography>
      </Box>

      {orders.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No orders yet
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} md={6} lg={4} key={order.id}>
              <OrderCard order={order} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

