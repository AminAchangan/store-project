import type { Metadata } from "next";

import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "headphone store",
  description: "Headphone store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-primary-700 font-sans">
        <Toaster position="top-center" />
        <header className="fixed w-full z-50">
          <Navbar />
        </header>
        <main>{children}</main>
        <footer>
          <HomeFooter />
        </footer>
      </body>
    </html>
  );
}
