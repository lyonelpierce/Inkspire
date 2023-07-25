// SearchBar.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { styleOptions } from "../constants";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
interface SearchBarImageData {
  id: string;
  imagePrompt: string;
  imageStyle: string;
  imageUrl: string;
  userId: string;
  username: string;
}

interface SearchBarProps {
  images: SearchBarImageData[];
  setFilteredImages: React.Dispatch<React.SetStateAction<SearchBarImageData[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ images, setFilteredImages }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("");

  function getLabelByValue(value: string) {
    const selectedOption = styleOptions.find((style) => style.value === value);
    return selectedOption ? selectedOption.label : "";
  }

  useEffect(() => {
    const filteredImages = images.filter((imageData) => {
      const matchPrompt =
        selectedPrompt === "" || imageData.imagePrompt.includes(selectedPrompt);
      const matchStyle =
        selectedStyle === "" || imageData.imageStyle.includes(selectedStyle);
      const matchSearch =
        searchQuery === "" ||
        imageData.imagePrompt.toLowerCase().includes(searchQuery.toLowerCase());

      return matchPrompt && matchStyle && matchSearch;
    });

    setFilteredImages(filteredImages);
  }, [selectedPrompt, selectedStyle, searchQuery, images, setFilteredImages]);

  const clearSelections = () => {
    setSelectedStyle("");
    setSearchQuery("");
  };

  return (
    <div className="flex space-x-4 px-7">
      <Input
        type="text"
        placeholder="Search by prompt..."
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        className="bg-gray-100 "
      />
      <Select onValueChange={(value: string) => setSelectedStyle(value)}>
        <SelectTrigger className="w-[180px]" aria-controls="content">
          <SelectValue>
            {selectedStyle === ""
              ? "All Styles"
              : getLabelByValue(selectedStyle)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent id="content">
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
      {searchQuery || selectedStyle ? (
        <div
          className="bg-gray-200 rounded-full p-2 hover:bg-violet-600 text-black hover:text-white cursor-pointer border-solid border-2 hover:border-violet-500"
          onClick={clearSelections}
        >
          <X height={19} width={19} />
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
