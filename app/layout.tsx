import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
