"use client";

import { LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type AuthButtonProps = {
  session: any;
  profile: ProfileType;
};

type ProfileType = {
  sub: string;
  name: string;
  username: string;
  email: string;
  picture: string;
};

export function AuthButton({ session, profile }: AuthButtonProps) {
  const router = useRouter();

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push(`http://localhost:3001/auth/google/login`);
  };

  const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await deleteSession();
  };

  const Dropdown = ({ profile }: { profile: ProfileType }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={profile?.picture} />
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
    );
  };

  return (
    <div>
      {session && profile ? (
        <Dropdown profile={profile} />
      ) : (
        <Button onClick={handleLogin}>Log in</Button>
      )}
    </div>
  );
}
