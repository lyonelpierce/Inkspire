import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/components/ModalProvider";
import { ImageModalProvider } from "@/components/ImageModalProvider";
import { CrispProvider } from "@/components/CrispProvider";

import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inkspire",
  description: "AI Tattoo Generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <CrispProvider />
        <body className={`bg-black ${inter.className}`}>
          <ModalProvider />
          <ImageModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
