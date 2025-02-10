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
          <QueryClientProvider client={queryClient}>
            <Navbar />
            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                borderRadius: "10px",
                background: "#121212",
                color: "#fff",
                fontFamily: "sans-serif",
                position: "relative",
                top: "80px",
                right: "20px",
              }}
            />
            <main>{children}</main>
            <Footer />
          </QueryClientProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
