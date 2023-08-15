"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "@/components/ui/badge";
import { Check, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { tools, business } from "../constants";

export const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/stripe", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const [isPro, setIsPro] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const response = await fetch("/api/subscription", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setIsPro(data.isPro);
        } else {
          setIsPro(false);
        }
      } catch (error) {
        setIsPro(false);
      }
    };

    fetchSubscriptionStatus();
  }, []);

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="bg-[#171717] border-0">
        <div className="text-center my-5">
          <p className="font-bold text-2xl text-white">Choose a Plan</p>
          <span className="text-white text-sm">
            It looks like you run out of credits, try again tomorrow or choose a
            plan!
          </span>
        </div>
        <div className="flex flex-col gap-5 items-center justify-center sm:flex-row sm:justify-center">
          {!isPro && (
            <Card className="p-7 space-y-3 bg-[#202020] border-0">
              <DialogHeader>
                <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                  <div className="flex items-center gap-x-2 font-bold py-1 text-white">
                    Upgrade to
                    <Badge variant="premium" className="uppercase text-sm py-1">
                      Pro
                    </Badge>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-3xl text-violet-500">
                      $5 / month
                    </p>
                    <p className="text-sm font-semibold text-gray-400">
                      ex. tax
                    </p>
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
              <DialogFooter>
                <Button
                  disabled={loading}
                  onClick={onSubscribe}
                  size="lg"
                  variant="premium"
                  className="w-full"
                >
                  Upgrade
                  <Zap className="w-4 g-4 ml-2 fill-white" />
                </Button>
              </DialogFooter>
            </Card>
          )}
          <Card className="p-7 space-y-3 bg-[#202020] border-0">
            <DialogHeader>
              <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                <div className="flex items-center gap-x-2 font-bold py-1 text-white">
                  Upgrade to
                  <Badge variant="premium" className="uppercase text-sm py-1">
                    Business
                  </Badge>
                </div>
                <div className="text-center">
                  <p className="font-bold text-3xl text-violet-500">
                    $10 / month
                  </p>
                  <p className="text-sm font-semibold text-gray-400">ex. tax</p>
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
            <DialogFooter>
              <Button disabled size="lg" variant="premium" className="w-full">
                Coming Soon
                <Zap className="w-4 g-4 ml-2 fill-white" />
              </Button>
            </DialogFooter>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
