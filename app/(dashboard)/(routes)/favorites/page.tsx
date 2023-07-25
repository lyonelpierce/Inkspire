"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Heading } from "@/components/Heading";
import { styleOptions } from "../../../../constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageCard from "@/components/GalleryCard";
import SkeletonCard from "@/components/SkeletonCard";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [showImages, setShowImages] = useState(false);
  const [filteredImages, setFilteredImages] = useState<ImageData[]>([]);

  const getImages = async () => {
    try {
      const res = await fetch("/api/favorites");
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

  function getLabelByValue(value: string) {
    const selectedOption = styleOptions.find((style) => style.value === value);
    return selectedOption ? selectedOption.label : "";
  }

  const handleRemoveCard = (imageId: string) => {
    setImages((prevImages) =>
      prevImages.filter((image) => image.id !== imageId)
    );
  };

  return (
    <div>
      <div className="flex sm:flex-row flex-col w-full justify-between sm:items-center">
        <Heading
          title="Favorites"
          description="Your favorite generations"
          icon={Heart}
          iconColor="text-pink-700"
          bgColor="bg-pink-700/10"
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
                <p className="font-medium">No favorite generations found</p>
                <Button
                  variant="default"
                  className="w-fit"
                  onClick={() => router.push("/explore")}
                >
                  Explore
                </Button>
              </div>
            ) : (
              filteredImages.map((imageData) => (
                <ImageCard
                  key={imageData.id}
                  imageData={imageData}
                  onRemove={handleRemoveCard}
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
