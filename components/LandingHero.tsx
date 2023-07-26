"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold py-28 text-center space-y-5">
      <div className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl space-y-5 font-bold ">
        <h1>The Best AI Tool for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-6xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
          <TypewriterComponent
            options={{
              strings: ["Tattoo Artists.", "Tattoo Enthusiasts."],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Generate tattoo ideas a 1000x times faster using the power of AI.
      </div>
      <div>
        <Link
          href={isSignedIn ? "/generator" : "/sign-up"}
          className="flex justify-center"
        >
          <Button
            variant="premium"
            className="md:text-lg p-4 md:p-6 rounded-lg font-medium mt-12 flex justify-center items-center relative overflow-hidden group"
          >
            Start Generating For Free
            <ArrowRight />
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required.
      </div>
    </div>
  );
};
