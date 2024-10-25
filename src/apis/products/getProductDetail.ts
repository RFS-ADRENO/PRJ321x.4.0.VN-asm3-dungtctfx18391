import type { ProductDetails } from "@/models/product";
import { api } from "../api";

export function getProductDetails(id: string) {
    return () =>
        api
            .get<ProductDetails>(`/products/${id}`, {
                params: {
                    _embed: "sizes",
                    _expand: ["cate", "color", "brand"],
                },
            })
            .then((res) => res.data);
}
