"use client";

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
import { User } from "@/types/user";
import { SaveRegular } from "@fluentui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface UserProfileFormProps {
  user: User;
}

export default function UserProfileForm({ user }: UserProfileFormProps) {
  const form = useForm<UserProfileSchema>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  function onSubmit(values: UserProfileSchema) {
    toast(<pre>{JSON.stringify(values, null, 2)}</pre>);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full items-center flex-col lg:flex-row gap-8 py-8"
      >
        <Avatar className="size-[250px]">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="w-[400px] space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-secondary font-bold text-xl">
                  Nome
                </FormLabel>
                <FormControl>
                  <Input className="p-5" placeholder="Digite aqui" {...field} />
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
                  <Input className="p-5" placeholder="Digite aqui" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full justify-end">
            <Button
              size="lg"
              className="rounded-md px-6 border-0 border-b-4 border-[#232779] cursor-pointer [&_svg:not([class*='size-'])]:size-6"
            >
              <span>Salvar</span>
              <SaveRegular />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
