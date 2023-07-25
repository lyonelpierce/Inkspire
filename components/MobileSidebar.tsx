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
    setIsMounted(false);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="md:hidden">
          <Menu className="text-white " height={30} width={30} />
        </div>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-0 text-white"
        onClick={handleClose}
      >
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
