// Role: GraphQL Query
// Purpose: Order-related queries

import { gql } from '@apollo/client';

export const GET_USER_ORDERS = gql`
  query GetUserOrders {
    me {
      id
      orders(first: 20) {
        edges {
          node {
            id
            number
            created
            status
            total {
              gross {
                amount
                currency
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_ORDER_DETAILS = gql`
  query GetOrderDetails($id: ID!) {
    order(id: $id) {
      id
      number
      created
      status
      total {
        gross {
          amount
          currency
        }
      }
      lines {
        id
        productName
        variantName
        quantity
        totalPrice {
          gross {
            amount
            currency
          }
        }
        thumbnail {
          url
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

