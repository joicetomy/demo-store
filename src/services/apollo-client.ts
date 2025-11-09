// Role: Service
// Purpose: Apollo Client configuration for Saleor GraphQL API

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Use Next.js API route as proxy to avoid CORS issues
const httpLink = createHttpLink({
  uri: typeof window !== 'undefined' 
    ? '/api/graphql'  // Client-side: use our API route proxy
    : process.env.NEXT_PUBLIC_SALEOR_API_URL || 'https://demo.saleor.io/graphql/', // Server-side: direct call
  credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('saleor-token') : null;
  return {
    headers: {
      ...headers,
      ...(token && { authorization: `Bearer ${token}` }),
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

