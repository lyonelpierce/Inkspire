"use client";

import { Heading } from "@/components/Heading";
import { ImageIcon } from "lucide-react";
import { Card, CardFooter } from "@/components/ui/card";
import { useState, useEffect } from "react";
import ImageCard from "@/components/GalleryCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SkeletonCard from "@/components/SkeletonCard";

interface ImageData {
  createdAt: string;
  id: string;
  imagePrompt: string;
  imageStatus: boolean;
  imageStyle: string;
  imageUrl: string;
  updatedAt: string;
  userId: string;
}

const Gallery = () => {
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
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <h2 className="text-lg font-semibold">Public Generations</h2>
          <Card
            className={
              images.length === 0
                ? "bg-gray-100 border-0 mt-8 p-3 flex items-center justify-center"
                : "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8 p-3 bg-gray-100 border-0"
            }
          >
            {/* Conditional rendering for publicImages */}
            {images.length === 0 ? (
              <div className="flex flex-col items-center p-5 gap-3">
                <p className="font-medium">No public generations found.</p>
                <Button variant="default" className="w-fit">
                  Generate
                </Button>
              </div>
            ) : !showImages ? ( // Show skeleton cards if showImages is false
              Array.from({ length: publicImages.length }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : (
              publicImages.map((imageData) => (
                <ImageCard key={imageData.id} imageData={imageData} />
              ))
            )}
          </Card>
        </div>
        <div>
          <div className="flex h-10 items-center mt-8 gap-2">
            <h2 className="text-lg font-semibold">Private Generations</h2>
            {!isPro && (
              <Badge variant="premium" className="uppercase text-sm py-1">
                Pro
              </Badge>
            )}
          </div>
          {isPro && privateImages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8 p-3 bg-gray-100 border-0">
              {showImages
                ? privateImages.map((imageData) => (
                    <ImageCard key={imageData.id} imageData={imageData} />
                  ))
                : Array.from({ length: privateImages.length }).map(
                    (_, index) => <SkeletonCard key={index} />
                  )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
