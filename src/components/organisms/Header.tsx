// Role: Component (Organism)
// Purpose: Application header with navigation

'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Button,
  Box,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useCart } from '@/hooks/useCart';

export function Header() {
  const { data: session } = useSession();
  const { items } = useCart();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
          <Typography variant="h6" component="div">
            Saleor Store
          </Typography>
        </Link>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button color="inherit" component={Link} href="/products">
            Products
          </Button>

          {session && (
            <Button color="inherit" component={Link} href="/orders">
              Orders
            </Button>
          )}

          <IconButton color="inherit" component={Link} href="/cart">
            <Badge badgeContent={items.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {session ? (
            <>
              <IconButton color="inherit" component={Link} href="/profile">
                <AccountCircleIcon />
              </IconButton>
              <Button color="inherit" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => signIn()}>
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

