import {
  PenTool,
  ImageIcon,
  GalleryHorizontalEnd,
  Scaling,
  ImageMinus,
  MinusCircle,
} from "lucide-react";

export const MAX_FREE_COUNTS = 20;
export const MAX_PRO_COUNTS = 2000;

export const styleOptions = [
  { label: "All Styles", value: "" },
  {
    label: "Watercolor",
    value: "watercolor",
  },
  {
    label: "Minimalist",
    value: "minimalist",
  },
  {
    label: "Geometric",
    value: "geometric",
  },
  {
    label: "Traditional",
    value: "traditional",
  },
  {
    label: "Surrealism",
    value: "surrealism",
  },
  {
    label: "Realism",
    value: "realism",
  },
  {
    label: "Anime",
    value: "anime",
  },
  {
    label: "Black and Grey",
    value: "blackandgrey",
  },
  {
    label: "New School",
    value: "newschool",
  },
  {
    label: "Dotwork",
    value: "dotwork",
  },
  {
    label: "Tribal",
    value: "tribal",
  },
  {
    label: "Japanese",
    value: "japanese",
  },
  {
    label: "Sketch",
    value: "sketch",
  },
];

export const free = [
  {
    label: "20 Daily Tokens",
    icon: PenTool,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Public Generations Only",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "Up to 2 Simultaneous Generations",
    icon: GalleryHorizontalEnd,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    label: "512x512 Resolution Only",
    icon: Scaling,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
  },
];

export const tools = [
  {
    label: "2000 Tokens",
    icon: PenTool,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Public & Private Generations",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "Up to 4 Simultaneous Generations",
    icon: GalleryHorizontalEnd,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    label: "Up to 1024x1024 resolution",
    icon: Scaling,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
  },
];

export const business = [
  {
    label: "Unlimited Generations",
    icon: PenTool,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Image to Image Generations",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "Image Variations",
    icon: GalleryHorizontalEnd,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    label: "Negative Prompt",
    icon: ImageMinus,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
  },
];
