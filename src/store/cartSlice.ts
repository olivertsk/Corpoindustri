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
          const priceToPlus =
            product.priceWithTax || product.promotionalPrice || product.price;
          set((state) => ({
            orderProducts: state.orderProducts.map((p) =>
              p.id === product.id
                ? {
                    ...p,
                    quantity: p.quantity + quantity,
                    subtotal: priceToPlus * (p.quantity + quantity),
                  }
                : p
            ),
          }));
        } else {
          const priceToPlus =
            product.priceWithTax || product.promotionalPrice || product.price;
          set((state) => ({
            orderProducts: [
              ...state.orderProducts,
              {
                coverImage: product.coverImage || product?.images[0]?.file,
                id: product.id,
                name: product.name,
                price: product.price,
                promotionalPrice: product.promotionalPrice,
                priceWithTax: product.priceWithTax,
                quantity,
                subtotal: priceToPlus,
                taxRate: product.taxRate,
                code: product.code,
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
        const priceToPlus =
          product.priceWithTax || product.promotionalPrice || product.price;
        set((state) => ({
          orderProducts: state.orderProducts.map((p) =>
            p.id === product.id
              ? {
                  ...p,
                  quantity: p.quantity + 1,
                  subtotal: priceToPlus * (p.quantity + 1),
                }
              : p
          ),
        }));
      },
      subtractQuantity: (product) => {
        const priceToPlus =
          product.priceWithTax || product.promotionalPrice || product.price;
        set((state) => ({
          orderProducts: state.orderProducts.map((p) =>
            p.id === product.id
              ? {
                  ...p,
                  quantity: p.quantity - 1,
                  subtotal: priceToPlus * (p.quantity - 1),
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
