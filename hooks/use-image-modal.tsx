import { create } from "zustand";

interface useImageModal {
  imageUrl: string;
  imagePrompt: string;
  imageStyle: string;
  username: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useImageModal = create<useImageModal>((set) => ({
  imageUrl: "",
  imagePrompt: "",
  imageStyle: "",
  username: "",
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
