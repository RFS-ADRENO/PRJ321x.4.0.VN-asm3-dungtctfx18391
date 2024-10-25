import type { Wishlist, Product } from "@/models/product";
import { api } from "../api";

export function getWishlist(productId: string) {
    return () => api.get<Wishlist>(`/wishlist/${productId}`).then((res) => res.data);
}

export function getAllWishlist() {
    return import.meta.env.DEV
        ? api
              .get<(Wishlist & { product: Product })[]>("/wishlist", {
                  params: { _expand: "product" },
              })
              .then((res) => res.data)
        : api.get<(Wishlist & { product: Product })[]>("/wishlist").then((res) => res.data);
}
