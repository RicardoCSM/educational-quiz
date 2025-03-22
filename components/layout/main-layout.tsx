import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/sidebar/app-sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
}

export default function MainLayout({ children, header }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky px-55 top-0 flex h-26 shrink-0 items-center gap-2 border-b bg-background">
          {header}
        </header>
        <div className="flex flex-1 flex-col gap-4 bg-accent px-55">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
