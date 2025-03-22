import UserProfileForm from "@/components/common/profile/user-profile-form";
import MainLayout from "@/components/layout/main-layout";

export default function Profile() {
  return (
    <MainLayout
      header={
        <h1 className="text-4xl font-bold text-secondary">Configurações</h1>
      }
    >
      <UserProfileForm />
    </MainLayout>
  );
}
