import { getProductsByFilter } from "@/apis/products";
import { useQuery } from "@tanstack/react-query";
import ProductGrid from "../ProductGrid";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import ProductPagination from "../ProductPagination";
import { usePagination } from "@/hooks/usePagination";

export default function ListFilteredProducts() {
    const [searchParams] = useSearchParams();

    const { data, isFetching, refetch } = useQuery({
        queryKey: ["get-filtered-products"],
        queryFn: getProductsByFilter({
            category: searchParams.get("category"),
            brand: searchParams.get("brand"),
            price: searchParams.get("price"),
            sort: searchParams.get("sort"),
            page: searchParams.get("page"),
        }),
    });

    usePagination();

    useEffect(() => {
        refetch();
    }, [searchParams]);

    return (
        <div className="mt-10 flex flex-col justify-between min-h-[584px] gap-8">
            <ProductGrid fetching={isFetching} data={data?.products} />
            <ProductPagination total={data?.total ?? 0} disabled={isFetching} />
        </div>
    );
}
