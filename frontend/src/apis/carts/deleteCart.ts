import { api } from "../api";

export async function deleteCart(data: { id: string }) {
    return api.delete<{}>(`/carts/${data.id}`).then((res) => res.data);
}
