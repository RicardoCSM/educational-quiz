import AuthSendCodeForm from "@/components/common/auth/auth-send-code-form";
import AuthLayout from "@/components/layout/auth-layout";

export default function SignIn() {
  return (
    <AuthLayout
      title="Seja bem vindo!"
      description="Por favor insira o seu email"
    >
      <AuthSendCodeForm />
    </AuthLayout>
  );
}
