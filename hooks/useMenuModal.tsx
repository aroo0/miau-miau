import { ModalPageVariant } from "@/app/global";
import { create } from "zustand";

interface MenuModalStore {
  isModalOpen: boolean ;
  currentPage: ModalPageVariant | undefined;
  onOpen: (page: ModalPageVariant) => void;
  onClose: () => void;
}

const useMenuModal = create<MenuModalStore>((set, get) => ({
  isModalOpen: false,
  currentPage: undefined,
  onOpen: (page: ModalPageVariant) => {
    set({ currentPage: page, isModalOpen: true });
  },

  onClose: () => set({ isModalOpen: false }),
}));

export default useMenuModal;
