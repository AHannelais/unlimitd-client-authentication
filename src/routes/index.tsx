import { ComponentType, Suspense, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import LoadingScreen from '@/components/LoadingScreen';
import USER_ROLES from '@/constants/userRoles';
import AuthGuard from '@/guards/AuthGuard';
import GuestGuard from '@/guards/GuestGuard';
import RoleBasedGuard from '@/guards/RoleBasedGuard';
import useAuth from '@/hooks/useAuth';
import ConnectedUserLayout from '@/layouts/ConnectedUserLayout';
import { TODO } from '@/types';

// eslint-disable-next-line react/display-name
function Loadable(Component: ComponentType) {
  return function load(props: TODO) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isInitialized } = useAuth();

    const renderLoadingScreen = <LoadingScreen />;

    return (
      <Suspense fallback={renderLoadingScreen}>
        {isInitialized ? <Component {...props} /> : renderLoadingScreen}
      </Suspense>
    );
  };
}
// Authentication Pages
const LoginPage = Loadable(lazy(() => import('@/pages/auth/Login')));

// Users Pages
const UserRootPage = Loadable(lazy(() => import('../pages/private/UserRoot')));
const UserPage = Loadable(lazy(() => import('../pages/private/User')));
const AdminPage = Loadable(lazy(() => import('../pages/private/Admin')));

const Router = () =>
  useRoutes([
    // Public pages
    {
      element: (
        <GuestGuard>
          <LoginPage />
        </GuestGuard>
      ),
      path: 'login',
    },
    // Private pages
    {
      children: [
        { element: <UserRootPage />, path: '' },
        {
          element: (
            <RoleBasedGuard accessibleRoles={[USER_ROLES.USER]}>
              <UserPage />
            </RoleBasedGuard>
          ),
          path: 'user',
        },
        {
          element: (
            <RoleBasedGuard accessibleRoles={[USER_ROLES.ADMIN]}>
              <AdminPage />
            </RoleBasedGuard>
          ),
          path: 'admin',
        },
      ],
      element: (
        <AuthGuard>
          <ConnectedUserLayout />
        </AuthGuard>
      ),
      path: '',
    },
    {
      // TODO: Implement a "catch all" route that Navigate to the / page when hit a non-existing page
      element: 'Remove this, and navigate to user root.',
      path: '*',
    },
  ]);

export default Router;
