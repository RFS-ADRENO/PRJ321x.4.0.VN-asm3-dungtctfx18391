import { getBrands } from "@/apis/brands";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export function useBrandFilter() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const brandQuery = useQuery({
        queryKey: ["get-brands"],
        queryFn: getBrands,
        staleTime: 1000 * 60 * 5,
    });

    const applyBrandFilter = useCallback(
        (brandId: string) => {
            if (location.pathname == "/products") {
                setSearchParams((params) => {
                    params.set("brand", brandId);
                    return params;
                });
            } else {
                navigate(`/products?brand=${brandId}`);
            }
        },
        [setSearchParams]
    );

    const getName = useCallback(
        (id: string) => {
            return brandQuery.data?.find((e) => e.id == id)?.name;
        },
        [brandQuery.data]
    );

    return { ...brandQuery, applyBrandFilter, current: searchParams.get("brand"), getName };
}
