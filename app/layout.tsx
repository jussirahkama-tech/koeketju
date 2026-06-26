import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Koeketju",
  description: "Koeketju toimii",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi">
      <body>{children}</body>
    </html>
  );
}
