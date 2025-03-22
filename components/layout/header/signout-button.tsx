"use client";

import { signOut } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/useAuth";
import { ApiResponse } from "@/types/api";
import { SignOutRegular } from "@fluentui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignOutButton() {
  const router = useRouter();
  const { removeUser } = useAuth();

  const { mutateAsync, status } = useMutation({
    mutationFn: signOut,
    onSuccess: (data: ApiResponse) => {
      if (data.success) {
        toast.success(data.message);
        removeUser();
        router.push("/sign-in");
      } else {
        toast.error(data.message);
      }
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
