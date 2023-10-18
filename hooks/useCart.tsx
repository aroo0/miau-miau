import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import toast from "react-hot-toast";
import { CamelCaseProduct } from "@/app/global";

interface CartItem {
  product: CamelCaseProduct;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: CamelCaseProduct, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: CamelCaseProduct, quantity = 1) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.product.id === data.id
        );

        if (existingItemIndex !== -1) {
          // Item already exists, update the quantity
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
          toast.success("Quantity updated in the cart.");
        } else {
          // Item doesn't exist, add it to the cart
          set({ items: [...currentItems, { product: data, quantity }] });
          toast.success("Item added to the cart.");
        }
      },
      updateQuantity: (id: string, quantity: number) => {
        const currentItems = get().items;
        const itemIndex = currentItems.findIndex((item) => item.product.id === id);

        if (itemIndex !== -1) {
          const updatedItems = [...currentItems];
          updatedItems[itemIndex].quantity = quantity;
          set({ items: updatedItems });
          toast.success("Quantity updated in the cart.");
        }
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.product.id !== id)] });
        toast.success("Item removed from the cart.");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
