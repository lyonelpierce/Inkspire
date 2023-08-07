"use client";

import { Montserrat } from "next/font/google";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { PenTool } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 pl-3 text-white">
        <PenTool height={35} width={35} />
        <h1 className={cn("text-2xl font-bold", font.className)}>
          Inkspire
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            Ai
          </span>
        </h1>
      </Link>
      <div className="flex items-center">
        <Link href={isSignedIn ? "/generator" : "/sign-up"}>
          <Button variant="premium" className="rounded-lg">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};
