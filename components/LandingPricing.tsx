"use client";

import { Card } from "@/components/ui/card";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { tools, business, free } from "../constants";

export const LandingPricing = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-semibold mb-10">
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
          Plan{" "}
        </span>
        Pricing
      </h2>
      <div className="flex flex-col gap-5 items-center justify-center sm:flex-row sm:justify-center">
        <Dialog>
          <Card className="p-7 space-y-3 bg-[#202020] border-0 w-1/3">
            <DialogHeader>
              <DialogTitle
                className="flex justify-center items-center flex-col gap-y-4 pb-2"
                id="proCard"
              >
                <div className="flex items-center gap-x-2 font-bold py-1 text-white">
                  <Badge variant="default" className="uppercase text-sm py-1">
                    Free
                  </Badge>
                </div>
                <div className="text-center">
                  <p className="font-bold text-3xl text-violet-500">Free</p>
                </div>
              </DialogTitle>
            </DialogHeader>
            {free.map((tool) => (
              <Card
                key={tool.label}
                className="p-3 border-black/5 flex items-center justify-between bg-[#171717] text-white"
              >
                <div className="flex items-center gap-x-4 mx-4">
                  <div className={cn("p-2 w-fit rounded-md ", tool.bgColor)}>
                    <tool.icon className={cn("h-6 w-6", tool.color)} />
                  </div>
                  <div className="font-semibold text-sm">{tool.label}</div>
                </div>
                <Check className="text-primary w-5 h-5" />
              </Card>
            ))}
          </Card>
          <Card className="p-7 space-y-3 bg-[#202020] border-0 w-1/3 shadow-2xl shadow-violet-500/50">
            <DialogHeader>
              <DialogTitle
                className="flex justify-center items-center flex-col gap-y-4 pb-2"
                id="proCard"
              >
                <div className="flex items-center gap-x-2 font-bold py-1 text-white">
                  <Badge variant="premium" className="uppercase text-sm py-1">
                    Pro
                  </Badge>
                </div>
                <div className="text-center">
                  <p className="font-bold text-3xl text-violet-500">
                    $5 / month
                  </p>
                  <p className="text-sm font-semibold text-gray-400">ex. tax</p>
                </div>
              </DialogTitle>
            </DialogHeader>
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className="p-3 border-black/5 flex items-center justify-between bg-[#171717] text-white"
              >
                <div className="flex items-center gap-x-4 mx-4">
                  <div className={cn("p-2 w-fit rounded-md ", tool.bgColor)}>
                    <tool.icon className={cn("h-6 w-6", tool.color)} />
                  </div>
                  <div className="font-semibold text-sm">{tool.label}</div>
                </div>
                <Check className="text-primary w-5 h-5" />
              </Card>
            ))}
          </Card>
          <Card className="p-7 space-y-3 bg-[#202020] border-0 w-1/3">
            <DialogHeader>
              <DialogTitle
                className="flex justify-center items-center flex-col gap-y-4 pb-2"
                id="businessCard"
              >
                <div className="flex items-center gap-x-2 font-bold py-1 text-white">
                  <Badge variant="premium" className="uppercase text-sm py-1">
                    Business
                  </Badge>
                </div>
                <div className="text-center">
                  <p className="font-bold text-3xl text-violet-500">
                    Comming Soon!
                  </p>
                </div>
              </DialogTitle>
            </DialogHeader>
            {business.map((tool) => (
              <Card
                key={tool.label}
                className="p-3 border-black/5 flex items-center justify-between bg-[#171717] text-white"
              >
                <div className="flex items-center gap-x-4 mx-4">
                  <div className={cn("p-2 w-fit rounded-md ", tool.bgColor)}>
                    <tool.icon className={cn("h-6 w-6", tool.color)} />
                  </div>
                  <div className="font-semibold text-sm">{tool.label}</div>
                </div>
                <Check className="text-primary w-5 h-5" />
              </Card>
            ))}
          </Card>
        </Dialog>
      </div>
    </div>
  );
};
