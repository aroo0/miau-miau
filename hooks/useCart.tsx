import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import toast from "react-hot-toast";
import { ShortProductType } from "@/app/global";
import SuccessToast from "@/components/SuccessToast";

export interface CartItem {
  product: ShortProductType;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: ShortProductType, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  getSubtotal: () => number;

}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: ShortProductType, quantity = 1) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.product.id === data.id
        );

        if (existingItemIndex !== -1) {
          // Item already exists, update the quantity
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
          toast.success("Quantity updated.");
        } else {
          // Item doesn't exist, add it to the cart
          set({ items: [...currentItems, { product: data, quantity }] });
          toast.custom((t) => <SuccessToast t={t} product={data} variant="Cart" />, { position: "top-right", duration: 4000 });
        }
      },
      updateQuantity: (id: string, quantity: number) => {
        const currentItems = get().items;
        const itemIndex = currentItems.findIndex((item) => item.product.id === id);

        if (itemIndex !== -1) {
          if (quantity < 1) {
            return;
          }
          const updatedItems = [...currentItems];
          updatedItems[itemIndex].quantity = quantity;
          set({ items: updatedItems });
          toast.success("Quantity updated.", {id: 'changeQuantity'});
        }
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.product.id !== id)] });
        toast.success("Item removed from the cart.");
      },
      removeAll: () => set({ items: [] }),
      getSubtotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          return total + item.product.price * item.quantity;
        }, 0);
      },

    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);



export default useCart;
