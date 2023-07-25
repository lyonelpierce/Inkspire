"use client";

import { Heading } from "@/components/Heading";
import { ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import ImageCard from "@/components/GalleryCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SkeletonDark from "@/components/SkeletonDark";
import { useRouter } from "next/navigation";

interface ImageData {
  createdAt: string;
  id: string;
  imagePrompt: string;
  imageStatus: boolean;
  imageStyle: string;
  imageUrl: string;
  updatedAt: string;
  userId: string;
  username: string;
}

const Gallery = () => {
  const router = useRouter();
  const [isPro, setIsPro] = useState<boolean | null>(null);
  const [images, setImages] = useState<ImageData[]>([]);
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const response = await fetch("/api/subscription", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setIsPro(data.isPro);
        } else {
          setIsPro(false);
        }
      } catch (error) {
        setIsPro(false);
      }
    };

    fetchSubscriptionStatus();
  }, []);

  const getImages = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data: ImageData[] = await res.json();

      setImages(data);

      setTimeout(() => {
        setShowImages(true);
      }, 1000);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  const publicImages = images.filter(
    (imageData) => imageData.imageStatus === true
  );
  const privateImages = images.filter(
    (imageData) => imageData.imageStatus === false && isPro === true
  );

  return (
    <div>
      <Heading
        title="Gallery"
        description="Your saved generations"
        icon={ImageIcon}
        iconColor="text-yellow-500"
        bgColor="bg-yellow-500/30"
      />
      <div className="px-4 lg:px-8">
        <div>
          <div className="text-xl font-semibold">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
              Public
            </span>{" "}
            <span className="text-white">Generations</span>
          </div>
          <Card
            className={
              images.length === 0
                ? "bg-[#171717] border-0 mt-5 p-5 flex items-center justify-center"
                : "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5 p-5 bg-[#171717] border-0"
            }
          >
            {images.length === 0 ? (
              <div className="flex flex-col items-center p-5 gap-3">
                <p className="font-medium text-white">No generations found.</p>

                <Button
                  variant="default"
                  className="w-fit"
                  onClick={() => router.push("/generator")}
                >
                  Generate
                </Button>
              </div>
            ) : !showImages ? (
              Array.from({ length: publicImages.length }).map((_, index) => (
                <SkeletonDark key={index} />
              ))
            ) : (
              publicImages.map((imageData) => (
                <ImageCard
                  key={imageData.id}
                  imageData={imageData}
                  onRemove={() => {}}
                />
              ))
            )}
          </Card>
        </div>
        <div>
          <div className="flex h-10 items-center mt-8 gap-2">
            <div className="text-xl font-semibold">
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                Private
              </span>{" "}
              <span className="text-white">Generations</span>
            </div>{" "}
            {!isPro && (
              <Badge variant="premium" className="uppercase text-sm py-1">
                Pro
              </Badge>
            )}
          </div>
          {isPro && privateImages.length > 0 && (
            <Card className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5 p-3 bg-[#171717] border-0 p-5">
              {showImages
                ? privateImages.map((imageData) => (
                    <ImageCard
                      key={imageData.id}
                      imageData={imageData}
                      onRemove={() => {}}
                    />
                  ))
                : Array.from({ length: privateImages.length }).map(
                    (_, index) => <SkeletonDark key={index} />
                  )}
            </Card>
          )}
        </div>
      </div>
      <div className="p-5"></div>
    </div>
  );
};

export default Gallery;
