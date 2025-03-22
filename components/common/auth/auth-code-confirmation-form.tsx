"use client";

import { confirmCode } from "@/app/actions/auth";
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
  authConfirmCodeSchema,
  AuthConfirmCodeSchema,
} from "@/lib/validations/authConfirmCode";
import { ApiSuccess } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AuthCodeConfirmationForm() {
  const params = useSearchParams();
  const email = params.get("email");

  const form = useForm<AuthConfirmCodeSchema>({
    resolver: zodResolver(authConfirmCodeSchema),
    defaultValues: {
      email: email || "",
      code: "",
    },
  });
  const router = useRouter();

  const { mutateAsync, status } = useMutation({
    mutationFn: confirmCode,
    onSuccess: (data: ApiSuccess) => {
      toast.success(data.message);
      router.push("/profile");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(values: AuthConfirmCodeSchema) {
    mutateAsync(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-secondary font-bold text-xl">
                Código
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
          Enviar
        </Button>
      </form>
    </Form>
  );
}
