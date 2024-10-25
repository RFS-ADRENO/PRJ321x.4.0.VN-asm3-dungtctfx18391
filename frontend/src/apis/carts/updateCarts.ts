import type { Cart } from "@/models/product";
import { api } from "../api";

export async function updateCarts(data: { id: string, quantity: number }) {
    return api
        .patch<Cart>(`/carts/${data.id}`, {
            quantity: data.quantity,
        })
        .then((res) => res.data);
}
