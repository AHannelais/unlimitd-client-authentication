import { PropsWithChildren } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import useAuth from '../hooks/useAuth';

// TODO: Implement the auth guard logic
export default function AuthGuard({ children }: PropsWithChildren) {
  const { isInitialized } = useAuth();

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return children;
}
