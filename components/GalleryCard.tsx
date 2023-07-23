import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Heart } from "lucide-react";

interface ImageData {
  id: string;
  imagePrompt: string;
  imageStyle: string;
  imageUrl: string;
  userId: string;
  username: string;
}

const ImageCard: React.FC<{ imageData: ImageData }> = ({ imageData }) => {
  console.log(imageData);
  return (
    <Card
      key={imageData.id}
      className="relative rounded-lg overflow-hidden group hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
    >
      <div className="aspect-square">
        <Image fill alt="Generated" src={imageData.imageUrl} />
      </div>
      <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100">
        {/* Black vignette over the image */}
        <div className="w-full h-full bg-gradient-to-br from-transparent via-black to-black opacity-60"></div>

        {/* Text content */}
        <div className="absolute bottom-0 left-0 w-full text-white text-sm p-4 group-hover:opacity-100">
          <p className="font-semibold">{imageData.imagePrompt}</p>
          <p>{imageData.imageStyle}</p>
        </div>

        {/* Button in the top-left corner */}
        <p className="absolute top-2 left-2 px-2 py-3 text-white text-sm hover:text-yellow-500">
          @{imageData.username}
        </p>

        {/* Heart Icon */}
        <Heart className="absolute top-4 right-4 text-white hover:text-red-500 w-8 h-8 opacity-0 group-hover:opacity-100" />
      </div>
    </Card>
  );
};

export default ImageCard;
