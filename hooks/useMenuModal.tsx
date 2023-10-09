import { ModalPageVariant } from "@/app/global";
import { create } from "zustand"

interface MenuModalStore {
  isOpen: boolean;
  page: ModalPageVariant | undefined;
  onOpen: (page: ModalPageVariant) => void
  onClose: () => void
}

const useMenuModal = create<MenuModalStore>((set) => ({
  isOpen: false,
  page: undefined,
  onOpen: (page: ModalPageVariant) => set({page: page, isOpen: true}),
  onClose: () => set({isOpen: false})
}))

export default useMenuModal