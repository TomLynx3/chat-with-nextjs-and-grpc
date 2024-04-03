import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import React from "react";
import StyledComponentsRegistry from "@/app/StyledComponentsRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "gNextChat",
  description: "Chat app created with gRPC and Next.js",
};

export default function RootLayout({
children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={inter.className}>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
      </html>
  );
}