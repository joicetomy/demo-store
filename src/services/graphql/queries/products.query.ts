// Role: GraphQL Query
// Purpose: Fetch products from Saleor API

import { gql } from '@apollo/client';
import { PRODUCT_FRAGMENT } from '../fragments/product.fragment';

export const GET_PRODUCTS = gql`
  ${PRODUCT_FRAGMENT}
  query GetProducts($first: Int = 20, $channel: String!) {
    products(first: $first, channel: $channel) {
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = gql`
  ${PRODUCT_FRAGMENT}
  query GetProductBySlug($slug: String!, $channel: String!) {
    product(slug: $slug, channel: $channel) {
      ...ProductFragment
      variants {
        id
        name
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
  }
`;

