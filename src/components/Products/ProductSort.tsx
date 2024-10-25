import { useSearchParams } from "react-router-dom";
import Dropdown, { type Option } from "../Dropdown";
import { ProductSortFilter } from "@/constants";

export default function ProductSort() {
    const [params, setParams] = useSearchParams();
    const sort = params.get("sort");

    function handleSort(data: Option) {
        setParams((p) => {
            p.set("sort", data.value);
            return new URLSearchParams(p);
        });
    }
    return (
        <div className="w-36 z-10">
            <Dropdown
                variant="secondary"
                onChange={handleSort}
                selected={sort ?? ""}
                data={[
                    {
                        name: "Sản phẩm mới",
                        value: ProductSortFilter.CREATION_DESC,
                    },
                    {
                        name: "Giá thấp nhất",
                        value: ProductSortFilter.PRICE_ASC,
                    },
                    {
                        name: "Giá cao nhất",
                        value: ProductSortFilter.PRICE_DESC,
                    },
                ]}
            />
        </div>
    );
}
