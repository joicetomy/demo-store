// Role: Component (Molecule)
// Purpose: Order summary card

import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Order } from '@/types';
import { formatCurrency } from '@/utils/formatCurrency';
import Link from 'next/link';

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const statusColor =
    order.status === 'FULFILLED'
      ? 'success'
      : order.status === 'CANCELED'
      ? 'error'
      : 'warning';

  return (
    <Link href={`/orders/${order.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ cursor: 'pointer', '&:hover': { boxShadow: 4 } }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Order #{order.number}</Typography>
            <Chip label={order.status} color={statusColor} size="small" />
          </Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {new Date(order.created).toLocaleDateString()}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
            {formatCurrency(order.total.gross.amount, order.total.gross.currency)}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

