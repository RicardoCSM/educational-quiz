"use client";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/user";

export default function NavUser({ user }: { user: User }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center space-x-4">
          <Avatar className="size-8">
            <AvatarImage src="" alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-xl leading-tight">
            <span className="truncate font-bold text-secondary">
              {user.name}
            </span>
            <span className="truncate text-lg text-secondary">{user.role}</span>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
