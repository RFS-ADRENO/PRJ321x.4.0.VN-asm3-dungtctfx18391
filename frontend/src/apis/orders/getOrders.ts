import { Order } from "@/models/product";
import { api } from "../api";

export async function getOrders() {
    return import.meta.env.DEV
        ? api
              .get<Order[]>("/orders", {
                  params: {
                      _embed: "orderProducts",
                  },
              })
              .then((res) => res.data)
        : api.get<Order[]>("/orders").then((res) => res.data);
}

export function getOrderDetails(orderId: string) {
    return () => import.meta.env.DEV
        ? api
              .get<Order>(`/orders/${orderId}`, {
                  params: {
                      _embed: "orderProducts",
                  },
              })
              .then((res) => res.data)
        : api.get<Order>(`/orders/${orderId}`).then((res) => res.data);
}
