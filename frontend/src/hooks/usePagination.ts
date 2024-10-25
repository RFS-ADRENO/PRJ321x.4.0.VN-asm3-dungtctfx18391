import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function usePagination() {
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page");

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, [page]);
}
