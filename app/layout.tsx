import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import VantaBg from "@/components/VantaBg";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vihaan | Developer",
  description: "Portfolio website of Vihaan Verma.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <VantaBg>{children}</VantaBg>
      </body>
    </html>
  );
}
