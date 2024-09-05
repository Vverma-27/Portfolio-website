import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import VantaBg from "@/components/VantaBg";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vihaan | Developer",
  description: "Portfolio website of Vihaan Verma.",
  icons: {
    icon: "/vihaan.png", // Set the path to your favicon here
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/vihaan.png" />
      </head>
      <body className={inter.className}>
        <VantaBg>{children}</VantaBg>
      </body>
    </html>
  );
}
