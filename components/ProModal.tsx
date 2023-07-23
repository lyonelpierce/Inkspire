"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Badge } from "@/components/ui/badge";
import {
  PenTool,
  ImageIcon,
  Check,
  Zap,
  GalleryHorizontalEnd,
  Scaling,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const tools = [
  {
    label: "1000 Tokens",
    icon: PenTool,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/generator",
  },
  {
    label: "Private Generations",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/gallery",
  },
  {
    label: "Up to 4 Multiple Generations",
    icon: GalleryHorizontalEnd,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    href: "/favorites",
  },
  {
    label: "Up to 1024x1024 resolution",
    icon: Scaling,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/favorites",
  },
];

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
      console.log(data);
      window.location.href = data.url;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade to Pro
              <Badge variant="premium" className="uppercase text-sm py-1">
                Pro
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>
        {tools.map((tool) => (
          <Card
            key={tool.label}
            className="p-3 border-black/5 flex items-center justify-between"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
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
      </DialogContent>
    </Dialog>
  );
};
