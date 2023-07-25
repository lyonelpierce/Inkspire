"use client";

import { useState, useEffect } from "react";
import { ImageModal } from "@/components/ImageModal";

export const ImageModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <ImageModal />
    </>
  );
};
