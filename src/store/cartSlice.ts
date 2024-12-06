import { create } from 'zustand';
import { OrderProduct, Product } from '../types/product';
import { persist, PersistOptions } from 'zustand/middleware';

export type CartStore = {
  orderProducts: OrderProduct[];
  addProduct: (product: Product, quantity: number) => void;
  removeProduct: (product: OrderProduct) => void;
  clearCart: () => void;
  addQuantity: (product: OrderProduct) => void;
  subtractQuantity: (product: OrderProduct) => void;
};

export const useCartStore = create<CartStore>()(
  persist<CartStore>(
    (set, get) => ({
      orderProducts: [],
      addProduct: (product, quantity) => {
        if (!!get().orderProducts.find((p) => p.id === product.id)) {
          set((state) => ({
            orderProducts: state.orderProducts.map((p) =>
              p.id === product.id
                ? {
                    ...p,
                    quantity: p.quantity + quantity,
                    subtotal:
                      (p.promotionalPrice || p.price) * (p.quantity + quantity),
                  }
                : p
            ),
          }));
        } else {
          set((state) => ({
            orderProducts: [
              ...state.orderProducts,
              {
                coverImage: product.coverImage,
                id: product.id,
                name: product.name,
                price: product.price,
                quantity,
                promotionalPrice: product.promotionalPrice,
                subtotal: product.promotionalPrice || product.price,
              },
            ],
          }));
        }
      },
      removeProduct: (product) => {
        set((state) => ({
          orderProducts: state.orderProducts.filter((p) => p.id !== product.id),
        }));
      },
      clearCart: () => {
        set({
          orderProducts: [],
        });
      },
      addQuantity: (product) => {
        set((state) => ({
          orderProducts: state.orderProducts.map((p) =>
            p.id === product.id
              ? {
                  ...p,
                  quantity: p.quantity + 1,
                  subtotal: (p.promotionalPrice || p.price) * (p.quantity + 1),
                }
              : p
          ),
        }));
      },
      subtractQuantity: (product) => {
        set((state) => ({
          orderProducts: state.orderProducts.map((p) =>
            p.id === product.id
              ? {
                  ...p,
                  quantity: p.quantity - 1,
                  subtotal: (p.promotionalPrice || p.price) * (p.quantity - 1),
                }
              : p
          ),
        }));
      },
    }),
    {
      name: 'cart-storage',
    } as PersistOptions<CartStore>
  )
);
