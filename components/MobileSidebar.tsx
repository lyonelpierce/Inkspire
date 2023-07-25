"use client";
import { Menu } from "lucide-react";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";

interface MobileSidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}

const MobileSidebar = ({
  apiLimitCount = 0,
  isPro = false,
}: MobileSidebarProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <div className="md:hidden" onClick={handleSidebarToggle}>
            <Menu className="text-white " height={25} width={25} />
          </div>
        </SheetTrigger>
        <SheetContent
          side="left"
          className={`p-0 text-white ${isSidebarOpen ? "block" : "hidden"}`}
        >
          <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
        </SheetContent>
      </Sheet>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={handleSidebarToggle}
        />
      )}
    </>
  );
};

export default MobileSidebar;
