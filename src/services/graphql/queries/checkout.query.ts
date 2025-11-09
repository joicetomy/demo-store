// Role: GraphQL Query
// Purpose: Checkout-related queries

import { gql } from '@apollo/client';

export const GET_CHECKOUT = gql`
  query GetCheckout($id: ID!) {
    checkout(id: $id) {
      id
      email
      lines {
        id
        quantity
        variant {
          id
          name
          product {
            id
            name
            thumbnail {
              url
            }
          }
          pricing {
            price {
              gross {
                amount
                currency
              }
            }
          }
        }
      }
      totalPrice {
        gross {
          amount
          currency
        }
      }
      shippingAddress {
        firstName
        lastName
        streetAddress1
        streetAddress2
        city
        postalCode
        country {
          code
        }
        phone
      }
      billingAddress {
        firstName
        lastName
        streetAddress1
        streetAddress2
        city
        postalCode
        country {
          code
        }
        phone
      }
    }
  }
`;

