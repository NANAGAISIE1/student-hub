"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Loader2 } from "lucide-react";
import Link from "next/link";

import UserAvatar from "./user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const UserAccountNav = () => {
  const { user, isLoading, isAuthenticated } = useKindeBrowserClient();

  if (isLoading) return <Loader2 className="animate h-8 w-8 animate-spin" />;

  if (isAuthenticated && user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          className={"h-8 w-8 rounded-full hover:cursor-pointer"}
        >
          <UserAvatar
            imageUrl={user?.picture as string}
            name={user?.given_name as string}
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-0.5 leading-none">
              {<p className="text-sm font-medium">{user.given_name}</p>}
              {<p className="w-[200px] truncate text-xs">{user.email}</p>}
            </div>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer hover:bg-destructive focus:bg-destructive">
            <LogoutLink className="w-full text-destructive hover:text-destructive-foreground">
              Log out
            </LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
};

export default UserAccountNav;
