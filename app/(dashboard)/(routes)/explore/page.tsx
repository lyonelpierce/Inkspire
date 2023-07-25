"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Heading } from "@/components/Heading";
import { styleOptions } from "../../../../constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageCard from "@/components/GalleryCard";
import SkeletonCard from "@/components/SkeletonCard";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [showImages, setShowImages] = useState(false);

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

  const filteredImages = images.filter((imageData) => {
    const matchPrompt =
      selectedPrompt === "" || imageData.imagePrompt.includes(selectedPrompt);
    const matchStyle =
      selectedStyle === "" || imageData.imageStyle.includes(selectedStyle);
    const matchSearch =
      searchQuery === "" ||
      imageData.imagePrompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      imageData.imageStyle.toLowerCase().includes(searchQuery.toLowerCase());

    return matchPrompt && matchStyle && matchSearch;
  });

  function getLabelByValue(value: string) {
    const selectedOption = styleOptions.find((style) => style.value === value);
    return selectedOption ? selectedOption.label : "";
  }

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
        <div className="flex space-x-4 px-7">
          <input
            type="text"
            placeholder="Search by prompt..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-100 px-3 py-2 rounded-md border-gray-300 focus:ring-sky-500 focus:border-sky-500 flex-1 text-sm border"
          />
          <Select onValueChange={(value: string) => setSelectedStyle(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue>
                {selectedStyle === ""
                  ? "All Styles"
                  : getLabelByValue(selectedStyle)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {styleOptions.map((style) => (
                <SelectItem
                  key={style.value}
                  value={style.value}
                  className="cursor-pointer"
                >
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
              <p>No images found</p>
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
