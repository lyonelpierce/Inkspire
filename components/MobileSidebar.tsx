"use client";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Sidebar from "@/components/Sidebar";

interface MobileSidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}

const MobileSidebar = ({
  apiLimitCount = 0,
  isPro = false,
}: MobileSidebarProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleClose = (event: any) => {
    event.preventDefault();
    setIsMounted(false);
  };

  return (
    <Sheet>
      <SheetTrigger>
        <div className="md:hidden">
          <Menu className="text-white " height={25} width={25} />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 text-white">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
        <a href="#" onClick={handleClose}>
          Close
        </a>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
