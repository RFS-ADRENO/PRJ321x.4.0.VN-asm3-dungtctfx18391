import { ProductPriceFilter } from "@/constants";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function usePriceFilter() {
    const [searchParams, setSearchParams] = useSearchParams();

    const data = useMemo(
        () => [
            {
                name: "0 - 1.000.000",
                id: ProductPriceFilter.FROM_0_TO_1MIL,
            },
            {
                name: "1.000.000 - 2.000.000",
                id: ProductPriceFilter.FROM_1MIL_TO_2MIL,
            },
            {
                name: "2.000.000 - 3.000.000",
                id: ProductPriceFilter.FROM_2MIL_TO_3MIL,
            },
            {
                name: "> 3.000.000",
                id: ProductPriceFilter.FROM_3MIL,
            },
        ],
        []
    );

    const applyPriceFilter = useCallback((priceFilter: ProductPriceFilter) => {
        setSearchParams(params => {
            params.set("price", priceFilter);
            return params;
        });
    }, [setSearchParams]);

    const getName = useCallback(
        (id: string) => {
            return data?.find((e) => e.id == id)?.name;
        },
        [data]
    );

    return { data, applyPriceFilter, current: searchParams.get("price"), getName };
}
