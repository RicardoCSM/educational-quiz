import AuthCodeConfirmationForm from "@/components/common/auth/auth-code-confirmation-form";
import AuthLayout from "@/components/layout/auth-layout";

export default function SignInConfirm() {
  return (
    <AuthLayout
      title="Digite seu código"
      description="Por favor insira seu código que enviamos para o seu e-mail"
    >
      <AuthCodeConfirmationForm />
    </AuthLayout>
  );
}
