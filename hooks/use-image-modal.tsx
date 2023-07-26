import { create } from "zustand";

interface useImageModal {
  imageId: string;
  imageUrl: string;
  imagePrompt: string;
  imageStyle: string;
  username: string;
  ownerId: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useImageModal = create<useImageModal>((set) => ({
  imageId: "",
  imageUrl: "",
  imagePrompt: "",
  imageStyle: "",
  username: "",
  ownerId: "",
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
