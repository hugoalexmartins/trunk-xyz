import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { UserProvider } from "@/contexts/UserProvider";
import "@/styles/globals.css";

const C = {
  canvas: "#F5F9FC",
  ink: "#0B1929",
  primary: "#00D9FF",
  secondary: "#FFB81C",
  accent: "#FF4D7D",
  muted: "#4A5A6A",
  faint: "#8B99A6",
};

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div
        style={{
          fontFamily: '"Space Grotesk", system-ui, sans-serif',
          background: C.canvas,
          overflowX: "hidden",
        }}
      >
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </UserProvider>
      </div>
    </ThemeProvider>
  );
}
