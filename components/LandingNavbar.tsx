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
        <PenTool height={30} width={30} />
        <h1 className={cn("text-2xl font-bold", font.className)}>Inkspire</h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/explore" : "/sign-up"}>
          <Button variant="premium" className="rounded-lg">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};
