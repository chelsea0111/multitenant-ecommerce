import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface TenantCart {
  productIds: string[];
}

interface Cartstate {
  tenantCarts: Record<string, TenantCart>;
  addProduct: (tenantSlug: string, productId: string) => void;
  removeProduct: (tenantSlug: string, productId: string) => void;
  clearCart: (tenantSlug: string) => void;
  clearAllCarts: () => void;
}

export const useCartStore = create<Cartstate>()(
  persist(
    (set) => ({
      tenantCarts: {},
      addProduct: (tenantSlug, productId) =>
        set((state) => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenantSlug]: {
              productIds: [
                ...(state.tenantCarts[tenantSlug]?.productIds || []),
                productId,
              ],
            },
          },
        })),
      removeProduct: (tenantSlug, productId) =>
        set((state) => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenantSlug]: {
              productIds:
                state.tenantCarts[tenantSlug]?.productIds.filter(
                  (id) => id != productId
                ) || [],
            },
          },
        })),
      clearCart: (tenantSlug) =>
        set((state) => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenantSlug]: {
              productIds: [],
            },
          },
        })),
      clearAllCarts: () => set({ tenantCarts: {} }),
    }),
    {
      name: "learnity-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
