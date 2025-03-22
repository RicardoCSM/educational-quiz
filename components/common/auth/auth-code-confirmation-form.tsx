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
  authConfirmCodeSchema,
  AuthConfirmCodeSchema,
} from "@/lib/validations/authConfirmCode";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AuthCodeConfirmationForm() {
  const form = useForm<AuthConfirmCodeSchema>({
    resolver: zodResolver(authConfirmCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  function onSubmit(values: AuthConfirmCodeSchema) {
    toast(<pre>{JSON.stringify(values, null, 2)}</pre>);
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
          Enviar
        </Button>
      </form>
    </Form>
  );
}
