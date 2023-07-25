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
        setLoading(false); // Set loading to false after 1 second
        setShowImages(true); // Show the actual images after 1 second
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
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Recent Generations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading && !showImages
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonDark key={index} />
            ))
          : images.map((image) => (
              <Card
                key={image.id}
                className="bg-neutral-950 border-none relative rounded-lg overflow-hidden group hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
              >
                <Image
                  width={512}
                  height={512}
                  src={image.imageUrl}
                  alt="Generated"
                  className="rounded-lg hover:shadow-xl transition duration-200 ease-in-out cursor-pointer "
                />
                <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100">
                  <div className="w-full h-full bg-gradient-to-br from-transparent via-black to-black opacity-60">
                    <div className="absolute bottom-0 left-0 w-full text-white text-sm p-4 group-hover:opacity-100">
                      <p className="font-semibold">{image.imagePrompt}</p>
                    </div>
                    <p className="absolute top-2 left-2 px-2 py-4 text-white text-sm font-medium">
                      {image.username}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
      </div>
    </div>
  );
};
