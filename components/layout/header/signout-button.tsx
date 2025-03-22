"use client";

import { signout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/useAuth";
import { SignOutRegular } from "@fluentui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignOutButton() {
  const router = useRouter();
  const { removeUser } = useAuth();

  const { mutateAsync, status } = useMutation({
    mutationFn: signout,
    onSuccess: (status: boolean) => {
      if (!status) {
        toast.error("Erro ao deslogar usuário.");
        return;
      }

      removeUser();
      toast.success("Usuário deslogado com sucesso.");
      router.push("/sign-in");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  function handleSignOut() {
    mutateAsync();
  }

  return (
    <Button
      className="[&_svg:not([class*='size-'])]:size-6 cursor-pointer"
      onClick={handleSignOut}
      disabled={status === "pending"}
    >
      <SignOutRegular />
    </Button>
  );
}
