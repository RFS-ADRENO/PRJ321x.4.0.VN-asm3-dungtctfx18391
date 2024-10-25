import { getColors } from "@/apis/colors";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function useColorFilter() {
    const [searchParams, setSearchParams] = useSearchParams();

    const colorQuery = useQuery({
        queryKey: ["get-colors"],
        queryFn: getColors,
        staleTime: 1000 * 60 * 5,
    });

    const applyColorFilter = useCallback(
        (colorId: string) => {
            setSearchParams((params) => {
                params.set("color", colorId);
                return params;
            });
        },
        [setSearchParams]
    );

    const getColor = useCallback(
        (id: string) => {
            return colorQuery.data?.find((e) => e.id == id)?.code;
        },
        [colorQuery.data]
    );

    return { ...colorQuery, applyColorFilter, current: searchParams.get("color"), getColor };
}
