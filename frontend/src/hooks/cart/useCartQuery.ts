import { getCarts } from "@/apis/carts";
import { useCartStore } from "@/stores/cartStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function useCartQuery() {
    const setCarts = useCartStore((s) => s.setCarts);
    const carts = useCartStore((s) => s.carts);

    const { data, isLoading } = useQuery({
        queryKey: ["get-carts"],
        queryFn: getCarts,
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        if (data) {
            setCarts(data);
        }
    }, [data]);

    return { carts, isLoading };
}
