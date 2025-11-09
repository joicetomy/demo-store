// Role: Service
// Purpose: Order data fetching and management

import { apolloClient } from './apollo-client';
import { GET_USER_ORDERS, GET_ORDER_DETAILS } from './graphql/queries/orders.query';
import { adaptOrder } from './adapters/orderAdapter';
import { Order } from '@/types';

export async function getUserOrders(): Promise<Order[]> {
  try {
    const { data } = await apolloClient.query({
      query: GET_USER_ORDERS,
    });

    if (!data.me?.orders?.edges) {
      return [];
    }

    return data.me.orders.edges.map((edge: any) => adaptOrder(edge.node));
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
}

export async function getOrderDetails(orderId: string): Promise<Order> {
  try {
    const { data } = await apolloClient.query({
      query: GET_ORDER_DETAILS,
      variables: { id: orderId },
    });

    return adaptOrder(data.order);
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;
  }
}

