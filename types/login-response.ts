export type LoginResponse = {
  session: {
    id: string;
    createdAt: string;
    updatedAt: string;
    expiresAt: string;
    userId: string;
    deviceInfo: string;
  };
  token: string;
  role: string;
};
