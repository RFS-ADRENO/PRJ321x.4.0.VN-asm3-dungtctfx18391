import { getSizes } from "@/apis/sizes";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function useSizeFilter() {
    const [searchParams, setSearchParams] = useSearchParams();

    const sizeQuery = useQuery({
        queryKey: ["get-sizes"],
        queryFn: getSizes,
        staleTime: 1000 * 60 * 5,
    });

    const applySizeFilter = useCallback(
        (size: number) => {
            setSearchParams((params) => {
                params.set("size", size.toString());
                return params;
            });
        },
        [setSearchParams]
    );

    return { ...sizeQuery, applySizeFilter, current: parseInt(searchParams.get("size") ?? "") };
}
