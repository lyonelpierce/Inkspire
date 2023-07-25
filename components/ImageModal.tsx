"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useImageModal } from "@/hooks/use-image-modal";
import { Button } from "@/components/ui/button";
import { Download, Copy } from "lucide-react";

import Image from "next/image";

export const ImageModal = () => {
  const imageModal = useImageModal();
  const { imageUrl, imagePrompt, imageStyle, username } = useImageModal();

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const anchor = document.createElement("a");
      anchor.href = URL.createObjectURL(blob);

      const filename = "generated_image.png";
      anchor.download = filename;

      anchor.click();

      URL.revokeObjectURL(anchor.href);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(imagePrompt).then(
      () => {
        console.log("Prompt copied to clipboard:", imagePrompt);
      },
      (error) => {
        console.error("Error copying prompt to clipboard:", error);
      }
    );
  };

  const firstLetter = username ? username.charAt(0).toUpperCase() : "";

  return (
    <Dialog open={imageModal.isOpen} onOpenChange={imageModal.onClose}>
      <DialogContent className="p-5 flex">
        <Image
          width={512}
          height={512}
          alt="Generated"
          src={imageUrl}
          className="rounded-lg"
        />
        <div className="w-lg p-3 flex flex-col gap-5 w-3/5">
          <div className="font-semibold text-violet-500 text-lg flex items-center gap-2">
            <div className="bg-violet-500 rounded-full w-8 h-8 flex items-center justify-center text-white">
              {firstLetter}
            </div>
            {username}
          </div>
          <div className="bg-gray-100 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-sm">Prompt:</p>
              <Button onClick={handleCopyPrompt} className="rounded-full h-15">
                <Copy size={15} />
                <span className="text-xs font-medium">Copy prompt</span>
              </Button>
            </div>
            <p className="bg-white rounded-lg p-2 text-sm">{imagePrompt}</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-3">
            <p className="font-semibold text-sm mb-2">Style:</p>
            <p className="bg-white rounded-lg p-2 text-sm">{imageStyle}</p>
          </div>
          <Button className="gap-2 font-semibold" onClick={handleDownload}>
            <Download />
            Download
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
