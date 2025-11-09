// Role: GraphQL Mutation
// Purpose: Checkout mutations (create, add items, update, complete)

import { gql } from '@apollo/client';

export const CREATE_CHECKOUT = gql`
  mutation CreateCheckout($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        email
        lines {
          id
          quantity
        }
        totalPrice {
          gross {
            amount
            currency
          }
        }
      }
      errors {
        field
        message
      }
    }
  }
`;

export const ADD_TO_CHECKOUT = gql`
  mutation AddToCheckout($checkoutId: ID!, $lines: [CheckoutLineInput!]!) {
    checkoutLinesAdd(checkoutId: $checkoutId, lines: $lines) {
      checkout {
        id
        lines {
          id
          quantity
        }
        totalPrice {
          gross {
            amount
            currency
          }
        }
      }
      errors {
        field
        message
      }
    }
  }
`;

export const UPDATE_CHECKOUT_LINE = gql`
  mutation UpdateCheckoutLine($checkoutId: ID!, $lines: [CheckoutLineUpdateInput!]!) {
    checkoutLinesUpdate(checkoutId: $checkoutId, lines: $lines) {
      checkout {
        id
        lines {
          id
          quantity
        }
        totalPrice {
          gross {
            amount
            currency
          }
        }
      }
      errors {
        field
        message
      }
    }
  }
`;

export const REMOVE_FROM_CHECKOUT = gql`
  mutation RemoveFromCheckout($checkoutId: ID!, $lineIds: [ID!]!) {
    checkoutLinesDelete(checkoutId: $checkoutId, linesIds: $lineIds) {
      checkout {
        id
        lines {
          id
          quantity
        }
        totalPrice {
          gross {
            amount
            currency
          }
        }
      }
      errors {
        field
        message
      }
    }
  }
`;

export const COMPLETE_CHECKOUT = gql`
  mutation CompleteCheckout($checkoutId: ID!) {
    checkoutComplete(checkoutId: $checkoutId) {
      order {
        id
        number
        created
        status
      }
      errors {
        field
        message
      }
    }
  }
`;

