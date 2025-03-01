import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "South Hillbillies A.C.",
  description: "Calculate running paces across different distances based on your input time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Header />
        {children}
      </body>
    </html>
  );
}
