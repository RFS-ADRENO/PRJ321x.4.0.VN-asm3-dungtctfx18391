import type { Size } from "@/models/product";
import { api } from "../api";

export async function getSizes() {
    return api.get<Size[]>("/sizes").then((res) => {
        return Array.from(new Set(res.data.map((e) => e.size).sort((a, b) => a - b))); // dev mode only
    });
}
