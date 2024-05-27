"use client";

import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteSession } from "@/lib/session";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

type ProfileProps = {
  session: any;
  profile: Profile | null;
};

type Profile = {
  username: string;
  name: string;
  sub: string;
  picture: string;
  iat: number;
  exp: number;
};

export function ProfileAvatar({ session, profile }: ProfileProps) {
  const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await deleteSession();
  };

  return (
    <div className="mr-4">
      {session && profile ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                src={profile?.picture}
                alt={`${profile?.name} profile picture`}
              />
              <AvatarFallback>{profile?.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>{profile?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <button onClick={handleLogout} className="w-full cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button className="w-full cursor-pointer rounded-2xl px-6" asChild>
          <Link href="/auth">Log in</Link>
        </Button>
      )}
    </div>
  );
}
