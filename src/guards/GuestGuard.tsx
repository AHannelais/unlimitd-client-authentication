import useAuth from '@/hooks/useAuth';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';

export default function GuestGuard({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
}
