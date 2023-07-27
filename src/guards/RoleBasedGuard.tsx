import useAuth from '@/hooks/useAuth';
import { User } from '@/types';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';

interface Props {
  accessibleRoles: User['role'][];
}

export default function RoleBasedGuard({ accessibleRoles, children }: PropsWithChildren<Props>) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!accessibleRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
}
