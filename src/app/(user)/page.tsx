"use client";
import Link from "next/link";
import Container from "@/components/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

async function getProfile() {
  try {
    const session = await getSession();
    const accessToken = session?.accessToken;

    console.log(accessToken);

    if (accessToken) {
      const res = await fetch("http://localhost:3001/auth/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch profile data:", res.statusText);
        return null;
      }
      return res.json();
    } else {
      // If no access token is available, return null or fallback value
      return null;
    }
  } catch (error) {
    // Handle fetch error
    console.error("Error fetching profile data:", error);
    return null;
  }
}

export default function Home() {
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getProfile();
      setProfile(profileData);
    };

    fetchProfile();

    const message = localStorage.getItem("message");
    if (message) {
      toast({
        variant: "default",
        title: "Notification!🔔",
        description: message,
      });
      localStorage.removeItem("message");
    }
  }, []);

  return (
    <Container className="my-6 ">
      <div className="flex items-center mb-14">
        <Avatar>
          <AvatarImage src="https://github.com/thenotoriousgustav.png" />
          <AvatarFallback>Gustam Rheza</AvatarFallback>
        </Avatar>
        <h1 className="text-xl ml-4">Home Page</h1>
      </div>
      <Button className="mt-4" asChild>
        <Link href="/pilih-ujian">Pilih Ujian</Link>
      </Button>
      <div>
        <pre>
          {profile ? (
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          ) : (
            <p>No profile data available</p>
          )}
        </pre>
      </div>
    </Container>
  );
}
