"use client";

import { Heading } from "@/components/Heading";
import { ImageIcon } from "lucide-react";
import { Card, CardFooter } from "@/components/ui/card";
import { useState, useEffect } from "react";
import Image from "next/image";

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
        description="Your saved creations"
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <h2 className="text-lg font-semibold">Public Creations</h2>
          <Card className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 p-3 bg-gray-100 border-0">
            {publicImages.map((imageData) => (
              <Card key={imageData.id} className="rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  <Image fill alt="Generated" src={imageData.imageUrl} />
                </div>
                <CardFooter className="p-2 gap-2 flex flex-col">
                  <p className="text-sm">
                    <span className="font-semibold">Prompt: </span>
                    {imageData.imagePrompt}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Style: </span>
                    {imageData.imageStyle}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </Card>
        </div>
        {isPro && privateImages.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mt-8">Private Creations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 p-3 bg-gray-100 border-0">
              {privateImages.map((imageData) => (
                <Card key={imageData.id} className="rounded-lg overflow-hidden">
                  <div className="relative aspect-square">
                    <Image fill alt="Generated" src={imageData.imageUrl} />
                  </div>
                  <CardFooter className="p-2 gap-2 flex flex-col">
                    <p className="text-sm">
                      <span className="font-semibold">Prompt: </span>
                      {imageData.imagePrompt}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Style: </span>
                      {imageData.imageStyle}
                    </p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
