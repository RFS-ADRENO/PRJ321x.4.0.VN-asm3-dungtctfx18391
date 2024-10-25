import type { CartDetail } from "@/models/product";
import { api } from "../api";

export async function getCarts() {
    return api
        .get<CartDetail[]>("/carts", {
            params: { _expand: ["product", "size"] },
        })
        .then((res) => res.data);
}

export async function getCart(cartId: string) {
    return api
        .get<CartDetail>(`/carts/${cartId}`, {
            params: { _expand: ["product", "size"] },
        })
        .then((res) => res.data);
}
