"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/navigation/Navbar";
import "./globals.css";
import SessionWrapper from "./components/SessionWrapper";
import Footer from "./components/navigation/Footer";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <QueryClientProvider client={queryClient}>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </QueryClientProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
