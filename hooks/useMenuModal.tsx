import { ModalPageVariant } from "@/app/global";
import { create } from "zustand";

interface MenuModalStore {
  currentPage: ModalPageVariant | undefined;
  onClose: () => void;
  onClick: (page: ModalPageVariant) => void;
}

const useMenuModal = create<MenuModalStore>((set, get) => ({
  currentPage: undefined,
  onClose: () => set({ currentPage: undefined }),
  onClick: (page: ModalPageVariant) => {
    console.log(get().currentPage)
    if (get().currentPage === page) {
      set({ currentPage: undefined });
      
    } else {
      set({ currentPage: page });
      console.log(get().currentPage)

    }
  },
}));

export default useMenuModal;
