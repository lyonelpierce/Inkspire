"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold md:py-10 text-center space-y-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl space-y-5 font-bold text-left p-10">
          <h1 className="text-5xl md:text-6xl">The Best AI Tool for</h1>
          <div className="h-28 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <TypewriterComponent
              options={{
                strings: ["Tattoo Artists.", "Tattoo Enthusiasts."],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          <div className="text-sm md:text-xl font-light text-zinc-400">
            Generate tattoo designs 1000x times faster.
            <p>Unleash the power of AI.</p>
          </div>
          <div className="flex flex-col w-fit gap-3">
            <Link
              href={isSignedIn ? "/generator" : "/sign-up"}
              className="flex justify-center"
            >
              <Button
                variant="premium"
                className="md:text-lg p-4 md:p-6 rounded-lg font-medium mt-4 flex justify-center items-center relative overflow-hidden group gap-2"
              >
                Start Generating For Free
                <ArrowRight />
              </Button>
            </Link>
            <div className="text-white text-xs md:text-sm font-normal text-center">
              No credit card required.
            </div>
          </div>
        </div>
        <Image
          width={500}
          height={500}
          src="/hero8.png"
          alt="hero"
          className="mb-10"
        />
      </div>
    </div>
  );
};
