"use client";

import { Montserrat } from "next/font/google";
import Link from "next/link";
import { PenTool } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

export const LandingFooter = () => {
  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <div className="text-white flex flex-row items-center justify-center gap-2">
        <PenTool height={30} width={30} />
        <h2 className={cn("text-lg font-bold", font.className)}>Inkspire</h2>
      </div>
      <div className="flex items-center">
        <Link
          href="https://lyonelpierce.com"
          className="text-white hover:text-gray-300"
          target="_blank"
        >
          by Lyonel Pierce
        </Link>
      </div>
    </nav>
  );
};
