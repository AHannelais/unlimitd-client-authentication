import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';
import LoadingScreen from '../components/LoadingScreen';
import useAuth from '../hooks/useAuth';

export default function AuthGuardedRouter({ children }: PropsWithChildren) {
  const { isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}
