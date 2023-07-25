"use client";
import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("83c0f8ca-0b25-4a64-8811-73120ddd49c6");
  }, []);

  return null;
};
