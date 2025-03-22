export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
