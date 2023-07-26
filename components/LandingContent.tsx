"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import SkeletonDark from "@/components/SkeletonDark";

interface ImageData {
  id: string;
  imagePrompt: string;
  imageStyle: string;
  imageUrl: string;
  userId: string;
  username: string;
}

export const LandingContent = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showImages, setShowImages] = useState(false);

  const getImages = async () => {
    try {
      const res = await fetch("/api/explore");
      const data: ImageData[] = await res.json();

      setImages(data);
      setTimeout(() => {
        setLoading(false);
        setShowImages(true);
      }, 1000);
    } catch (error) {
      console.error("Error fetching images:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-semibold mb-10">
        Recent Generations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading && !showImages
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonDark key={index} />
            ))
          : images.slice(0, 8).map((image) => (
              <Card
                key={image.id}
                className="bg-black/0 border-none relative rounded-lg overflow-hidden group hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
              >
                <Image
                  width={512}
                  height={512}
                  src={image.imageUrl}
                  alt="Generated"
                  className="rounded-lg hover:shadow-xl transition duration-200 ease-in-out cursor-pointer "
                />
              </Card>
            ))}
      </div>
    </div>
  );
};
