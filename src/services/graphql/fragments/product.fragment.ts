// Role: GraphQL Fragment
// Purpose: Reusable product field set for queries

import { gql } from '@apollo/client';

export const PRODUCT_FRAGMENT = gql`
  fragment ProductFragment on Product {
    id
    name
    slug
    description
    thumbnail {
      url
      alt
    }
    category {
      id
      name
    }
    pricing {
      priceRange {
        start {
          gross {
            amount
            currency
          }
        }
      }
    }
  }
`;

