import ListFilteredProducts from "@/components/Products/ListFilteredProducts";
import ProductFilter from "@/components/Products/ProductFilter";
import ProductSort from "@/components/Products/ProductSort";

export default function Products() {

    return (
        <div className="bg-white py-24">
            <div className="container">
                <div className="flex gap-20">
                    <ProductFilter />
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <h1 className="text-4xl font-bold uppercase">Danh sách sản phẩm</h1>
                            <ProductSort />
                        </div>
                        <ListFilteredProducts />
                    </div>
                </div>
            </div>
        </div>
    );
}
