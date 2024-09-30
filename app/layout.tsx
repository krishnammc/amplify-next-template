import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./app.css";
import { Providers } from "./provider";
import AppLayout from "@/lib/app/app_layout";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{backgroundColor:"#3182ce"}}>
        <Providers>
        <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}
