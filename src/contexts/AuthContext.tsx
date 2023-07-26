import { useLazyQuery } from '@apollo/client';
import { PropsWithChildren, createContext, useEffect, useMemo, useState } from 'react';
import { CURRENT_USER } from '@/graphql/users/queries';
import { TODO } from '@/types';

// Initialize the context
interface AuthContextValue {
  isAuthenticated: boolean;
  isInitialized: boolean;
  logout: () => void;
  onLoginSuccess: (token: string) => void;
  user: TODO;
}

const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  isInitialized: false,
  logout: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onLoginSuccess: (token: string) => {},
  user: null,
});

function AuthProvider({ children }: PropsWithChildren) {
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const logout = () => {
    // TODO: Implement the logout logic
  };

  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  const [getCurrentUser, { data: currentUser, refetch: refetchCurrentUser }] = useLazyQuery(
    CURRENT_USER,
    {
      nextFetchPolicy: 'cache-and-network',
      onCompleted: () => {
        // TODO: Implement on completed logic
      },
      onError: () => {
        // TODO: Implement on error logic
      },
      refetchWritePolicy: 'overwrite',
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onLoginSuccess = (token: string) => {
    // TODO: Implement the onLoginSuccess logic
  };

  useEffect(() => {
    // TODO: implement the initialization logic
    setIsInitialized(true);
  }, []);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      isInitialized,
      logout,
      onLoginSuccess,
      user: currentUser?.me,
    }),
    [isAuthenticated, isInitialized, logout, onLoginSuccess, currentUser?.me]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
