import { Wishlist } from "@/models/product";
import { api } from "../api";

export async function addWishlist(productId: string) {
    return api.post<Wishlist>("/wishlist", { productId }).then((res) => res.data);
}

export async function removeWishlist(wishlistId: string) {
    return api.delete<{}>(`/wishlist/${wishlistId}`).then((res) => res.data);
}
