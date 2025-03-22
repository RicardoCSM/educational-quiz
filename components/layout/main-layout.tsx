import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/sidebar/app-sidebar";
import { Separator } from "../ui/separator";
import SignOutButton from "./header/signout-button";

interface MainLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
}

export default function MainLayout({ children, header }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex h-16 md:h-26 shrink-0 items-center gap-2 border-b bg-background">
          <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-6 mx-2" />
          <Separator orientation="vertical" />
          <div className="flex w-full justify-between items-center md:px-16 xl:px-55">
            {header}
            <SignOutButton />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 bg-accent md:px-16 xl:px-55">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
