"use client";

import { updateUserInfo } from "@/app/actions/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  UserProfileSchema,
  userProfileSchema,
} from "@/lib/validations/userProfile";
import { useAuth } from "@/store/useAuth";
import { User } from "@/types/user";
import { SaveRegular } from "@fluentui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function UserProfileForm() {
  const { user, setUser } = useAuth();
  const form = useForm<UserProfileSchema>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });
  const { mutateAsync, status } = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: (data: { message: string; user: User }) => {
      toast.success(data.message);
      setUser(data.user);
      form.setValue("name", data.user.name);
      form.setValue("email", data.user.email);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(values: UserProfileSchema) {
    mutateAsync(values);
  }

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <span className="text-xl">Usuário não encontrado</span>
      </div>
    );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full items-center flex-col lg:flex-row gap-8 py-8"
      >
        <Avatar className="size-[250px]">
          <AvatarImage src="" alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="w-screen p-4 md:p-0 md:w-[400px] space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-secondary font-bold text-xl">
                  Nome
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={status === "pending"}
                    className="p-5"
                    placeholder="Digite aqui"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-secondary font-bold text-xl">
                  E-mail
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={status === "pending"}
                    className="p-5"
                    placeholder="Digite aqui"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full justify-end">
            <Button
              size="lg"
              className="rounded-md px-6 border-0 border-b-4 border-[#232779] cursor-pointer [&_svg:not([class*='size-'])]:size-6"
              disabled={status === "pending"}
            >
              {status === "pending" && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Salvar</span>
              <SaveRegular />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
