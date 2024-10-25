import { getCategories } from "@/apis/categories";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function useCategoryFilter() {
    const [searchParams, setSearchParams] = useSearchParams();

    const categoryQuery = useQuery({
        queryKey: ["get-categories"],
        queryFn: getCategories,
        staleTime: 1000 * 60 * 5,
    });

    const applyCategoryFilter = useCallback(
        (cateId: string) => {
            setSearchParams(params => {
                params.set("category", cateId);
                return params;
            });
        },
        [setSearchParams]
    );

    const getName = useCallback(
        (id: string) => {
            return categoryQuery.data?.find((e) => e.id == id)?.name;
        },
        [categoryQuery.data]
    );

    return {
        ...categoryQuery,
        applyCategoryFilter,
        current: searchParams.get("category"),
        getName,
    };
}
