"use client";

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

export default function AuthSendCodeForm() {
  const form = useForm<AuthSendCodeSchema>({
    resolver: zodResolver(authSendCodeSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: AuthSendCodeSchema) {
    toast(<pre>{JSON.stringify(values, null, 2)}</pre>);
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
                <Input className="p-5" placeholder="Digite aqui" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          size="lg"
          className="w-full border-0 border-b-4 border-[#232779] cursor-pointer"
        >
          Enviar código
        </Button>
      </form>
    </Form>
  );
}
