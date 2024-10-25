import type { Cart } from "@/models/product";
import { api } from "../api";

export async function addCart(data: Omit<Cart, "id" | "quantity">) {
    return api.post<Cart>("/carts", { ...data, quantity: 1 }).then((res) => res.data);
}
