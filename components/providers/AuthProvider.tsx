import { getCurrentUserInfo } from "@/app/actions/users";
import { useAuth } from "@/store/useAuth";
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";
import Loading from "../layout/loading";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, removeUser } = useAuth();
  const { isPending, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await getCurrentUserInfo();
      if (user) {
        setUser(user);
      } else {
        removeUser();
      }

      return user;
    },
  });

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <>Error: {error.message}</>;
  }

  return <>{children}</>;
}
