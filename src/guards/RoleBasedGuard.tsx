import { TODO } from '@/types';
import { PropsWithChildren } from 'react';

interface Props {
  accessibleRoles: TODO;
}

// TODO: implement the role based guard logic
// eslint-disable-next-line  @typescript-eslint/no-unused-vars
const RoleBasedGuard = ({ accessibleRoles, children }: PropsWithChildren<Props>) => <>{children}</>;

export default RoleBasedGuard;
