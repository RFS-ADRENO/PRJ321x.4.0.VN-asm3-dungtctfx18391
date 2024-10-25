import type { Color } from "@/models/product";
import { api } from "../api";

export async function getColors() {
    return api.get<Color[]>("/colors").then((res) => res.data);
}
