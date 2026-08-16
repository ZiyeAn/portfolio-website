import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

export const metadata: Metadata = {
  title: "Ziye An | Portfolio",
  description: "The design and creative technology portfolio of Ziye An.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body><LanguageProvider>{children}</LanguageProvider></body>
    </html>
  );
}
