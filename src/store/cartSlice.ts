import { create } from 'zustand';
import { OrderProduct, Product } from '../types/product';
import { persist, PersistOptions } from 'zustand/middleware';
import { Coin } from './multicoinStore';
import { amountByCoin } from '../utils/normalizeAmounts';

export type CartStore = {
  orderProducts: OrderProduct[];
  addProduct: (product: Product, quantity: number, selectedCoin: Coin) => void;
  removeProduct: (product: OrderProduct) => void;
  clearCart: (selectedCoin: Coin) => void;
  addQuantity: (product: OrderProduct, selectedCoin: Coin) => void;
  subtractQuantity: (product: OrderProduct, selectedCoin: Coin) => void;
};

export const useCartStore = create<CartStore>()(
  persist<CartStore>(
    (set, get) => ({
      orderProducts: [],
      addProduct: (product, quantity, selectedCoin) => {
        if (!!get().orderProducts.find((p) => p.id === product.id)) {
          const priceToPlus = amountByCoin(selectedCoin, product);
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
          const priceToPlus = amountByCoin(selectedCoin, product);
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
                priceBs: product.priceBs,
                promotionalPriceBs: product.promotionalPriceBs,
                priceWithTaxBs: product.priceWithTaxBs,
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
      clearCart: (selectedCoin) => {
        let refreshedCart = [...get().orderProducts];
        get().orderProducts.forEach((product) => {
          if (selectedCoin.value === 'USD') {
            if (
              product.priceWithTax ||
              product.price ||
              product.promotionalPrice
            ) {
              refreshedCart = refreshedCart.filter((p) => p.id !== product.id);
            }
          } else {
            if (
              product.priceWithTaxBs ||
              product.priceBs ||
              product.promotionalPriceBs
            ) {
              refreshedCart = refreshedCart.filter((p) => p.id !== product.id);
            }
          }
        });
        set({
          orderProducts: refreshedCart,
        });
      },
      addQuantity: (product, selectedCoin) => {
        const priceToPlus = amountByCoin(selectedCoin, product);
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
      subtractQuantity: (product, selectedCoin) => {
        const priceToPlus = amountByCoin(selectedCoin, product);
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
