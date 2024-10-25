import { getProducts } from "@/apis/products";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../ProductGrid";
import ProductPagination from "../ProductPagination";
import { useEffect } from "react";
import { usePagination } from "@/hooks/usePagination";

export default function ListFoundProducts() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("q");
    const page = parseInt(searchParams.get("page") ?? "1");

    usePagination();

    const { data, isFetching, refetch } = useQuery({
        queryKey: ["search-products", searchParams],
        queryFn: getProducts(searchQuery ?? "", page),
    });

    useEffect(() => {
        refetch();
    }, [searchParams]);

    return (
        <div className="container">
            <h2 className="text-4xl text-center font-semibold uppercase">
                Kết quả tìm kiếm cho: <span className="text-zinc-400">{searchQuery ?? ""}</span>
            </h2>
            <div className="mt-10 flex flex-col justify-between min-h-[584px] gap-8">
                <ProductGrid fetching={isFetching} data={data?.products} />
                <ProductPagination total={data?.total ?? 0} disabled={isFetching} />
            </div>
        </div>
    );
}
