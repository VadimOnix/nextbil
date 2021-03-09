import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://homework.nextbil.com/graphql',
  cache: new InMemoryCache(),
});

