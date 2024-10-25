import { useCartStore } from "@/stores/cartStore";
import * as cartApi from "@apis/carts";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

export function useCartActions() {
    const getCart = useCartStore((s) => s.getCart);
    const getCartById = useCartStore((s) => s.getCartById);
    const addNewCart = useCartStore((s) => s.addCart);
    const incQty = useCartStore((s) => s.incQuantity);
    const decQty = useCartStore((s) => s.decQuantity);
    const delCart = useCartStore((s) => s.delCart);

    const addCartMutation = useMutation({
        mutationKey: ["add-cart"],
        mutationFn: cartApi.addCart,
    });

    const getCartMutation = useMutation({
        mutationKey: ["add-cart"],
        mutationFn: cartApi.getCart,
    });

    const updateCartMutation = useMutation({
        mutationKey: ["update-cart"],
        mutationFn: cartApi.updateCarts,
    });

    const deleteCartMutation = useMutation({
        mutationKey: ["delete-cart"],
        mutationFn: cartApi.deleteCart,
    });

    const addCart = useCallback(async (productId: string, sizeId: string) => {
        const find = getCart(productId, sizeId);
        if (find) {
            await updateCartMutation.mutateAsync({
                id: find.id,
                quantity: find.quantity + 1,
            });

            incQty(find.id);
        } else {
            const result = await addCartMutation.mutateAsync({ productId, sizeId });
            if (result.id) {
                const cartDetail = await getCartMutation.mutateAsync(result.id);
                addNewCart(cartDetail);
            }
        }
    }, []);

    const incQuantity = useCallback(async (cartId: string) => {
        const cart = getCartById(cartId);
        if (cart) {
            await updateCartMutation.mutateAsync({
                id: cartId,
                quantity: cart.quantity + 1,
            });

            incQty(cartId);
        }
    }, []);

    const decQuantity = useCallback(async (cartId: string) => {
        const cart = getCartById(cartId);
        if (cart) {
            const newQty = cart.quantity - 1;
            if (newQty == 0) await deleteCartMutation.mutateAsync({ id: cartId });
            else
                await updateCartMutation.mutateAsync({
                    id: cartId,
                    quantity: cart.quantity - 1,
                });

            decQty(cartId);
        }
    }, []);

    const deleteCart = useCallback(async (cartId: string) => {
        const cart = getCartById(cartId);
        if (cart) {
            await deleteCartMutation.mutateAsync({ id: cartId });
            delCart(cartId);
        }
    }, []);

    return {
        addCart,
        incQuantity,
        decQuantity,
        deleteCart,
        loading:
            addCartMutation.isPending ||
            getCartMutation.isPending ||
            updateCartMutation.isPending ||
            deleteCartMutation.isPending,
    };
}
