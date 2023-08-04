import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/components/ModalProvider";
import { CrispProvider } from "@/components/CrispProvider";
import { ImageModalProvider } from "@/components/ImageModalProvider";

import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inkspire.ai | AI Tattoo Generator",
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
          <ImageModalProvider />

          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
