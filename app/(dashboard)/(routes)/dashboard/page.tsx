"use client";
import { Card } from "@/components/ui/card";
import { PenTool, ArrowRight, ImageIcon, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const tools = [
  {
    label: "Generator",
    icon: PenTool,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/generator",
  },
  {
    label: "Gallery",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/gallery",
  },
  {
    label: "Favorites",
    icon: Star,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    href: "/favorites",
  },
];

const Dashboard = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Generate AI Tattoos - Experience the power of AI
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("h-8 w-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
