"use client";

import AuthCodeConfirmationForm from "@/components/common/auth/auth-code-confirmation-form";
import AuthLayout from "@/components/layout/auth-layout";
import Loading from "@/components/layout/loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
const queryClient = new QueryClient();

export default function SignInConfirm() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loading />}>
        <AuthLayout
          title="Digite seu código"
          description="Por favor insira seu código que enviamos para o seu e-mail"
        >
          <AuthCodeConfirmationForm />
        </AuthLayout>
      </Suspense>
    </QueryClientProvider>
  );
}
