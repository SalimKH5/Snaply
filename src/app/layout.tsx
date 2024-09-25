
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "./components/provider";
import { ToggleProvider } from "./components/SearchToggle";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Instagram Clone",
  description: "Instagram Clone Mad with Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={`${inter.className} w-full h-full `}>
        <Providers>
          <ToggleProvider><AntdRegistry>{children}</AntdRegistry></ToggleProvider>
        </Providers>
      </body>
    </html>
  );
}
