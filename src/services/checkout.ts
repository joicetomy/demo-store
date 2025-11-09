// Role: Service
// Purpose: Checkout and cart operations

import { apolloClient } from './apollo-client';
import {
  CREATE_CHECKOUT,
  ADD_TO_CHECKOUT,
  UPDATE_CHECKOUT_LINE,
  REMOVE_FROM_CHECKOUT,
  COMPLETE_CHECKOUT,
} from './graphql/mutations/checkout.mutation';
import { GET_CHECKOUT } from './graphql/queries/checkout.query';
import { adaptCheckout } from './adapters/checkoutAdapter';
import { CheckoutData } from '@/types';

export async function createCheckout(
  email: string,
  lines: Array<{ variantId: string; quantity: number }>
): Promise<CheckoutData> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_CHECKOUT,
      variables: {
        input: {
          email,
          lines,
          channel: process.env.NEXT_PUBLIC_SALEOR_CHANNEL || 'default-channel',
        },
      },
    });

    return adaptCheckout(data.checkoutCreate.checkout);
  } catch (error) {
    console.error('Error creating checkout:', error);
    throw error;
  }
}

export async function addToCheckout(
  checkoutId: string,
  lines: Array<{ variantId: string; quantity: number }>
): Promise<CheckoutData> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: ADD_TO_CHECKOUT,
      variables: {
        checkoutId,
        lines,
      },
    });

    return adaptCheckout(data.checkoutLinesAdd.checkout);
  } catch (error) {
    console.error('Error adding to checkout:', error);
    throw error;
  }
}

export async function updateCheckoutLine(
  checkoutId: string,
  lineId: string,
  quantity: number
): Promise<CheckoutData> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_CHECKOUT_LINE,
      variables: {
        checkoutId,
        lines: [{ lineId, quantity }],
      },
    });

    return adaptCheckout(data.checkoutLinesUpdate.checkout);
  } catch (error) {
    console.error('Error updating checkout line:', error);
    throw error;
  }
}

export async function removeFromCheckout(
  checkoutId: string,
  lineIds: string[]
): Promise<CheckoutData> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: REMOVE_FROM_CHECKOUT,
      variables: {
        checkoutId,
        lineIds,
      },
    });

    return adaptCheckout(data.checkoutLinesDelete.checkout);
  } catch (error) {
    console.error('Error removing from checkout:', error);
    throw error;
  }
}

export async function getCheckout(checkoutId: string): Promise<CheckoutData> {
  try {
    const { data } = await apolloClient.query({
      query: GET_CHECKOUT,
      variables: { id: checkoutId },
    });

    return adaptCheckout(data.checkout);
  } catch (error) {
    console.error('Error fetching checkout:', error);
    throw error;
  }
}

export async function completeCheckout(
  checkoutId: string
): Promise<{ orderId: string; orderNumber: string }> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: COMPLETE_CHECKOUT,
      variables: { checkoutId },
    });

    return {
      orderId: data.checkoutComplete.order.id,
      orderNumber: data.checkoutComplete.order.number,
    };
  } catch (error) {
    console.error('Error completing checkout:', error);
    throw error;
  }
}

