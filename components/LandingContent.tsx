"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import SkeletonDark from "@/components/SkeletonDark";
import { useImageModal } from "@/hooks/use-image-modal";

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
  const imageModal = useImageModal();

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

  const handleOpen = (
    imageUrl: string,
    imagePrompt: string,
    imageStyle: string,
    ownerId: string
  ) => {
    useImageModal.setState({
      imageUrl,
      imagePrompt,
      imageStyle,
      ownerId,
    });
    imageModal.onOpen();
  };

  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-semibold mb-10">
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
          Recent{" "}
        </span>
        Generations
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
                  className="rounded-lg hover:shadow-xl transition duration-200 ease-in-out cursor-pointer"
                />
                <div
                  className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100"
                  onClick={() =>
                    handleOpen(
                      image.imageUrl,
                      image.imagePrompt,
                      image.imageStyle,
                      image.id
                    )
                  }
                >
                  {/* Black vignette over the image */}
                  <div className="w-full h-full bg-gradient-to-br from-transparent via-black to-black opacity-60"></div>

                  {/* Text content */}
                  <div className="absolute bottom-0 left-0 w-full text-white text-sm p-4 group-hover:opacity-100">
                    <p className="font-semibold">{image.imagePrompt}</p>
                    <p>{image.imageStyle}</p>
                  </div>
                </div>
              </Card>
            ))}
      </div>
    </div>
  );
};
