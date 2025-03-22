"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Image from "next/image";
import NavUser from "./nav-user";
import {
  HomeRegular,
  BuildingTownhouseRegular,
  QuestionCircleRegular,
  SettingsRegular,
} from "@fluentui/react-icons";
import { NavMain } from "./nav-main";
import { useAuth } from "@/store/useAuth";

const data = {
  main: [
    {
      icon: HomeRegular,
      title: "Início",
      url: "#",
    },
    {
      icon: BuildingTownhouseRegular,
      title: "Escolas",
      url: "#",
    },
    {
      icon: QuestionCircleRegular,
      title: "Perguntas",
      url: "#",
    },
    {
      icon: SettingsRegular,
      title: "Configurações",
      url: "/profile",
    },
  ],
};

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  return (
    <Sidebar {...props} className="py-8 px-4">
      <SidebarHeader>
        <Image src="/images/logo.svg" alt="Logo" width={147} height={72} />
      </SidebarHeader>
      <SidebarContent className="pt-8 space-y-8">
        <SidebarSeparator />
        {user && <NavUser user={user} />}
        <SidebarSeparator />
        <NavMain items={data.main} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
