import type { Category } from "@/models/product";
import { api } from "../api";

export async function getCategories() {
    return api.get<Category[]>("/cates").then((res) => res.data);
}
