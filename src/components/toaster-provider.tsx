"use client";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export const ToasterProvider = () => {
  const { toast } = useToast();
  useEffect(() => {
    const message = localStorage.getItem("message");

    if (message) {
      localStorage.removeItem("message");
      toast({
        variant: "default",
        title: "Notification🔔",
        description: message,
      });
    }
  }, []);

  return (
    <>
      <Toaster />
    </>
  );
};
