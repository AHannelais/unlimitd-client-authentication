export interface User {
  createdAt: string;
  email: string;
  firstname: string;
  id: string;
  lastname: string;
  role: 'ADMIN' | 'USER';
  updatedAt: string;
}
