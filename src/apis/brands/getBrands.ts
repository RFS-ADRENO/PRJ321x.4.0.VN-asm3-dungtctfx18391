import type { Brand } from "@/models/product";
import { api } from "../api";

export async function getBrands() {
    return api.get<Brand[]>("/brands").then((res) => res.data);
}
