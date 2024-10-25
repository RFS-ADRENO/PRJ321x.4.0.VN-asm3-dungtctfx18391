import type { CartDetail } from "@/models/product";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface CartStore {
    carts: CartDetail[];
    getCart: (productId: string, sizeId: string) => CartDetail | undefined;
    getCartById: (cartId: string) => CartDetail | undefined;
    setCarts: (carts: CartDetail[]) => void;
    addCart: (cart: CartDetail) => void;
    incQuantity: (cartId: string) => void;
    decQuantity: (cartId: string) => void;
    delCart: (cartId: string) => void;
}

export const useCartStore = create<CartStore>()(
    immer((setState, getState) => ({
        carts: [],
        getCart(productId, sizeId) {
            return getState().carts.find((e) => e.productId == productId && e.sizeId == sizeId);
        },
        getCartById(cartId) {
            return getState().carts.find((e) => e.id == cartId);
        },
        setCarts(carts) {
            setState((s) => {
                s.carts = carts;
            });
        },
        addCart(cart: CartDetail) {
            setState((s) => {
                s.carts.push(cart);
            });
        },
        incQuantity(cartId) {
            setState((s) => {
                const cart = s.carts.find((e) => e.id == cartId);
                if (cart && cart.quantity < cart.size.quantity) {
                    cart.quantity++;
                }
            });
        },
        decQuantity(cartId) {
            setState((s) => {
                const cart = s.carts.find((e) => e.id == cartId);
                if (cart && cart.quantity > 0) {
                    cart.quantity--;
                    if (cart.quantity == 0) {
                        s.carts.splice(s.carts.indexOf(cart), 1);
                    }
                }
            });
        },
        delCart(cartId) {
            setState((s) => {
                const cart = s.carts.find((e) => e.id == cartId);
                if (cart) {
                    s.carts.splice(s.carts.indexOf(cart), 1);
                }
            });
        },
    }))
);
