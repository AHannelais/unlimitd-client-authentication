import useAuth from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function UserRoot() {
  const { user } = useAuth();

  switch (user?.role) {
    case 'ADMIN':
      return <Navigate to="/admin" />;
    case 'USER':
      return <Navigate to="/user" />;
    default:
      return <Navigate to="/login" />;
  }
}
