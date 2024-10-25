import { getProducts } from "@/apis/products";
import { useQuery } from "@tanstack/react-query";
import ProductGrid from "../ProductGrid";

export default function ListNewProducts() {
    const { data, isFetching } = useQuery({
        queryKey: ["get-products"],
        queryFn: getProducts(),
    });

    return (
        <div className="container">
            <h2 className="text-4xl text-center font-semibold uppercase">Sản phẩm mới</h2>
            <div className="mt-10">
                <ProductGrid fetching={isFetching} data={data?.products} />
            </div>
        </div>
    );
}
