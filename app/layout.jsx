"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/navigation/Navbar";
import "./globals.css";
import SessionWrapper from "./components/SessionWrapper";
import { Toaster } from "react-hot-toast";
import Footer from "./components/navigation/Footer";

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <Toaster position="top-right" reverseOrder={false} />
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
