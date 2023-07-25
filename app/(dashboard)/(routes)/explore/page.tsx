"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Heading } from "@/components/Heading";
import ImageCard from "@/components/GalleryCard";
import SkeletonCard from "@/components/SkeletonCard";
import SearchBar from "@/components/SearchBar";

interface ImageData {
  id: string;
  imagePrompt: string;
  imageStyle: string;
  imageUrl: string;
  userId: string;
  username: string;
}

const Dashboard = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showImages, setShowImages] = useState(false);
  const [filteredImages, setFilteredImages] = useState<ImageData[]>([]);

  const getImages = async () => {
    try {
      const res = await fetch("/api/explore");
      const data: ImageData[] = await res.json();

      setImages(data);
      setLoading(false);
      setTimeout(() => {
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
    <div>
      <div className="flex sm:flex-row flex-col w-full justify-between sm:items-center">
        <Heading
          title="Explore"
          description="Recent users generations"
          icon={Search}
          iconColor="text-sky-500"
          bgColor="bg-sky-500/10"
        />
        <SearchBar images={images} setFilteredImages={setFilteredImages} />
      </div>
      <div className="px-4 lg:px-8">
        <div>
          <Card className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8 p-3 bg-gray-100 border-0">
            {loading ? (
              Array.from({ length: images.length }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : !showImages ? (
              Array.from({ length: images.length }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : filteredImages.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center p-5 gap-3">
                <p className="font-medium">No generations found</p>
              </div>
            ) : (
              filteredImages.map((imageData) => (
                <ImageCard
                  key={imageData.id}
                  imageData={imageData}
                  onRemove={() => {}}
                />
              ))
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
