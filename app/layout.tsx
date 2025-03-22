import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const nunito = Nunito({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quiz Educacional",
  description: "Quiz educacional para testar seus conhecimentos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
