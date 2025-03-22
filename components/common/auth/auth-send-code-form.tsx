"use client";

import { login } from "@/app/actions/auth";
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
  authSendCodeSchema,
  AuthSendCodeSchema,
} from "@/lib/validations/authSendCode";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/types/api";

export default function AuthSendCodeForm() {
  const form = useForm<AuthSendCodeSchema>({
    resolver: zodResolver(authSendCodeSchema),
    defaultValues: {
      email: "",
    },
  });
  const router = useRouter();

  const { mutateAsync, status } = useMutation({
    mutationFn: login,
    onSuccess: (data: ApiResponse) => {
      if (data.success) {
        toast.success(data.message);
        router.push(`/sign-in/confirm?email=${form.getValues("email")}`);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(values: AuthSendCodeSchema) {
    mutateAsync(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        <Button
          size="lg"
          className="w-full border-0 border-b-4 border-[#232779] cursor-pointer"
          disabled={status === "pending"}
        >
          {status === "pending" && (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          )}
          Enviar código
        </Button>
      </form>
    </Form>
  );
}
