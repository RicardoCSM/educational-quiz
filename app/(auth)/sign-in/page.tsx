"use client";

import AuthSendCodeForm from "@/components/common/auth/auth-send-code-form";
import AuthLayout from "@/components/layout/auth-layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function SignIn() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthLayout
        title="Seja bem vindo!"
        description="Por favor insira o seu email"
      >
        <AuthSendCodeForm />
      </AuthLayout>
    </QueryClientProvider>
  );
}
