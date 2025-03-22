"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { FluentIcon } from "@fluentui/react-icons";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: FluentIcon;
  }[];
}) {
  const [currentPath, setCurrentPath] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  return (
    <SidebarGroup>
      <SidebarMenu className="space-y-4">
        {items.map((item) => (
          <SidebarMenuItem
            key={item.title}
            className="flex w-full justify-center"
          >
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              isActive={currentPath == item.url}
              className="h-14 text-xl text-bold text-secondary data-[active=true]:bg-primary data-[active=true]:text-white"
            >
              <Link href={item.url}>
                <span>
                  {item.icon && <item.icon className="text-[32px]" />}
                </span>
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
