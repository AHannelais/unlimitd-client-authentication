import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, concat } from '@apollo/client';
import { getTokenFromLocalStorage } from '@/utils/jwt';

const API_HTTP_URL = 'http://localhost:4000';

const httpLink = new HttpLink({ uri: API_HTTP_URL });

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = getTokenFromLocalStorage();
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }));

  return forward(operation);
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

export default apolloClient;
