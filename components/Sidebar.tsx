"use client";

import Link from "next/link";
import { Montserrat } from "next/font/google";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Search, PenTool, ImageIcon, Settings, Heart } from "lucide-react";

import { FreeCounter } from "@/components/FreeCounter";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Explore",
    icon: Search,
    href: "/explore",
    color: "text-sky-500",
  },
  {
    label: "Generate",
    icon: PenTool,
    href: "/generator",
    color: "text-violet-500",
  },
  {
    label: "Gallery",
    icon: ImageIcon,
    href: "/gallery",
    color: "text-yellow-500",
  },
  {
    label: "Favorites",
    icon: Heart,
    href: "/favorites",
    color: "text-pink-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

interface SidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}

const Sidebar = ({ apiLimitCount = 0, isPro = false }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-black text-white border-r border-white/10">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center gap-2 pl-3 mb-10 w-fit">
          <PenTool height={30} width={30} />
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            Inkspire
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
              Ai
            </span>
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount} />
    </div>
  );
};

export default Sidebar;
