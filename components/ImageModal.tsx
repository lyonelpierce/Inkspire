import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useImageModal } from "@/hooks/use-image-modal";
import { Button } from "@/components/ui/button";
import { Download, Copy, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";

import Image from "next/image";

export const ImageModal = () => {
  const imageModal = useImageModal();
  const { userId } = useAuth();
  const { isSignedIn } = useAuth();

  const [isOwn, setIsOwn] = useState(false);
  const { imageUrl, imagePrompt, imageStyle, username, imageId, ownerId } =
    useImageModal();

  useEffect(() => {
    setIsOwn(ownerId === userId);
  }, [ownerId, userId]);

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
      () => {},
      (error) => {
        console.error("Error copying prompt to clipboard:", error);
      }
    );
  };

  const firstLetter = username ? username.charAt(0).toUpperCase() : "";

  const handleDelete = async (imageId: string) => {
    try {
      const response = await fetch("/api/gallery", {
        method: "DELETE",
        body: JSON.stringify({ imageId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <Dialog open={imageModal.isOpen} onOpenChange={imageModal.onClose}>
      <DialogContent className="p-5 md:flex bg-[#171717] border-0">
        <Image
          width={512}
          height={512}
          alt="Generated"
          src={imageUrl}
          className="rounded-lg"
        />
        {isSignedIn && (
          <div className="md:w-lg p-3 flex flex-col gap-5 w-full md:w-3/5 mt-5 md:mt-0">
            {username && (
              <div className="font-semibold text-gray-300 flex items-center gap-2">
                <div className="bg-[#6653e0] rounded-full w-8 h-8 flex items-center justify-center text-white">
                  {firstLetter}
                </div>
                {username}
              </div>
            )}
            <div className="bg-[#202020] rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-sm text-white">Prompt:</p>
                <Button
                  onClick={handleCopyPrompt}
                  className="rounded-lg h-15 flex gap-2 bg-[#171717] border-0 text-white hover:bg-white hover:text-black"
                  variant="outline"
                >
                  <Copy size={10} />
                  <span className="text-xs font-medium">Copy prompt</span>
                </Button>
              </div>
              <p className="bg-[#171717] rounded-lg p-3 text-sm text-white">
                {imagePrompt}
              </p>
            </div>
            <div className="bg-[#202020] rounded-lg p-3">
              <p className="font-semibold text-white text-sm mb-2">Style:</p>
              <p className="bg-[#171717] rounded-lg p-3 text-sm text-white">
                {imageStyle}
              </p>
            </div>
            <div className="flex justify-between gap-2">
              <Button
                className={cn(
                  "gap-2 font-semibold",
                  isOwn ? "w-2/3" : "w-full"
                )}
                onClick={handleDownload}
              >
                <Download />
                Download
              </Button>
              {isOwn && (
                <Button
                  className="gap-2 font-semibold bg-red-500 hover:bg-red-600 w-1/3"
                  onClick={() => {
                    handleDelete(imageId);
                  }}
                >
                  <Trash2 />
                  Delete
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
