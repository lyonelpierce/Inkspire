import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, { message: "Prompt is required" }),
  style: z.string().nonempty({ message: "Type is required" }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

export const styleOptions = [
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

export const amountOptions = [
  {
    label: "1 Image",
    value: "1",
  },
  {
    label: "2 Images",
    value: "2",
  },
  {
    label: "3 Images",
    value: "3",
  },
  {
    label: "4 Images",
    value: "4",
  },
];

export const resolutionOptions = [
  {
    label: "512x512",
    value: "512",
  },
  {
    label: "768x768",
    value: "768",
  },
  {
    label: "1024x1024",
    value: "1024",
  },
];
