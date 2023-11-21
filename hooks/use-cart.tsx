import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductToBuy } from "@/types";

interface CartStore {
  items: ProductToBuy[];
  addItem: (data: ProductToBuy) => void;
  updateItem: (data: ProductToBuy) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: ProductToBuy) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item: ProductToBuy) => item.product.id === data.product.id
        );

        if (existingItem) {
          return toast("Item already in cart.");
        }

        set({ items: [...get().items, data] });
        toast.success("Item added to cart.");
      },
      updateItem: (data: ProductToBuy) => {
        set({
          items: [
            ...get().items.filter(
              (item: ProductToBuy) => item.product.id !== data.product.id
            ),
            data,
          ],
        });
      },
      removeItem: (id: string) => {
        set({
          items: [
            ...get().items.filter(
              (item: ProductToBuy) => item.product.id !== id
            ),
          ],
        });
        toast.success("Item removed from cart.");
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
