import type { Metadata } from "next";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "CreatorForge AI",
  description: "AI Creator Production Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-black text-white">
          {children}

          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#0f172a",
                color: "#fff",
                border: "1px solid rgba(34,211,238,0.2)",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}