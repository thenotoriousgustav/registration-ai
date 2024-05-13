"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const TanstackProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanstackProvider;
