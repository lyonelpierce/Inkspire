import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useImageModal } from "@/hooks/use-image-modal";

interface ImageData {
  id: string;
  imagePrompt: string;
  imageStyle: string;
  imageUrl: string;
  userId: string;
  username: string;
}

interface ImageCardProps {
  imageData: ImageData;
  onRemove: (imageId: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageData, onRemove }) => {
  const [isLiked, setIsLiked] = useState(false);
  const imageModal = useImageModal();

  useEffect(() => {
    const fetchLikedStatus = async () => {
      try {
        const response = await fetch(`/api/favorites/`);
        const data = await response.json();
        let isLiked = false;

        for (const favorite of data) {
          if (favorite.id === imageData.id) {
            isLiked = true;
            break;
          }
        }

        setIsLiked(isLiked);
      } catch (error) {
        console.error("Error checking like status:", error);
      }
    };

    fetchLikedStatus();
  }, [imageData.id]);

  const handleLikeClick = () => {
    if (isLiked) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
    }

    fetch("/api/favorites", {
      method: "POST",
      body: JSON.stringify({ imageId: imageData.id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          setIsLiked(!isLiked);
        }
        onRemove(imageData.id);
      })
      .catch((error) => {
        setIsLiked(!isLiked);
      });
  };

  const handleOpen = () => {
    const { imageUrl, imagePrompt, imageStyle, username, id } = imageData;

    useImageModal.setState({
      imageUrl,
      imagePrompt,
      imageStyle,
      username,
      imageId: id,
    });
    imageModal.onOpen();
  };

  return (
    <Card
      key={imageData.id}
      className="relative rounded-xl bg-black/0 overflow-hidden group hover:shadow-lg transition duration-300 ease-in-out cursor-pointer border-0"
    >
      <div className="aspect-square">
        <Image
          height={512}
          width={512}
          alt="Generated"
          src={imageData.imageUrl}
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100">
        {/* Black vignette over the image */}
        <div
          className="w-full h-full bg-gradient-to-br from-transparent via-black to-black opacity-60"
          onClick={handleOpen}
        ></div>

        {/* Text content */}
        <div className="absolute bottom-0 left-0 w-full text-white text-sm p-4 group-hover:opacity-100">
          <p className="font-semibold">{imageData.imagePrompt}</p>
          <p>{imageData.imageStyle}</p>
        </div>

        {/* Button in the top-left corner */}
        <p className="absolute top-2 left-2 px-2 py-4 text-white text-sm font-medium">
          {imageData.username}
        </p>

        {/* Heart Icon */}
        <Heart
          className={cn(
            "absolute top-4 right-4 text-white hover:text-red-500 w-10 h-10 p-2 opacity-0 group-hover:opacity-100 ",
            isLiked &&
              "text-opacity-100 bg-red-500 rounded-full w-10 h-10 p-2 flex items-center justify-center hover:text-white"
          )}
          onClick={handleLikeClick}
        />
      </div>
    </Card>
  );
};

export default ImageCard;
