import { useLazyQuery, useApolloClient } from '@apollo/client';
import { PropsWithChildren, createContext, useEffect, useMemo, useState } from 'react';
import { CURRENT_USER } from '@/graphql/users/queries';
import { User } from '@/types';
import { setSession, getTokenFromLocalStorage } from '@/utils/jwt';
import { useNavigate } from 'react-router-dom';

// Initialize the context
interface AuthContextValue {
  isAuthenticated: boolean;
  isInitialized: boolean;
  logout: () => void;
  // eslint-disable-next-line no-unused-vars
  onLoginSuccess: (token: string) => void;
  user: User | null;
}

const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  isInitialized: false,
  logout: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  onLoginSuccess: (_token: string) => {},
  user: null,
});

function AuthProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const appolloClient = useApolloClient();

  const [isInitialized, setIsInitialized] = useState(false);

  const [getCurrentUser, { data, refetch: refetchCurrentUser }] = useLazyQuery(CURRENT_USER, {
    nextFetchPolicy: 'cache-and-network',
    onError: () => {
      setSession(null);
      navigate('/login');
    },
    refetchWritePolicy: 'overwrite',
  });

  function logout() {
    setSession(null);

    // Reset data to undefined before refetching
    // This ensures that the data will be null/undefined until the refetch is completed
    appolloClient.cache.evict({ fieldName: 'currentUser' });
    refetchCurrentUser();
  }

  function onLoginSuccess(token: string) {
    setSession(token);

    refetchCurrentUser();
  }

  const isAuthenticated = useMemo(() => !!data?.currentUser, [data?.currentUser]);

  useEffect(() => {
    const token = getTokenFromLocalStorage();

    if (token) {
      getCurrentUser();
    }

    setIsInitialized(true);
  }, [getCurrentUser]);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      isInitialized,
      logout,
      onLoginSuccess,
      user: data?.currentUser || null,
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAuthenticated, isInitialized, data?.currentUser]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
