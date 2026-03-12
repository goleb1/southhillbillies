import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import { Instrument_Serif, Oswald } from "next/font/google";
import Header from "@/components/Header";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-sans",
});

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
    <html lang="en" className={`${instrumentSerif.variable} ${oswald.variable}`}>
      <body className="bg-fall">
        <Header />
        {children}
      </body>
    </html>
  );
}
