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
import { user } from "@/mock-data/user";
import {
  HomeRegular,
  BuildingTownhouseRegular,
  QuestionCircleRegular,
  SettingsRegular,
} from "@fluentui/react-icons";
import { NavMain } from "./nav-main";

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
  return (
    <Sidebar {...props} className="py-8 px-4">
      <SidebarHeader>
        <Image src="/images/logo.svg" alt="Logo" width={147} height={72} />
      </SidebarHeader>
      <SidebarContent className="pt-8 space-y-8">
        <SidebarSeparator />
        <NavUser user={user} />
        <SidebarSeparator />
        <NavMain items={data.main} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
