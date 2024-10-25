import { ProductPriceFilter } from "@/constants";
import {
    useBrandFilter,
    useCategoryFilter,
    useColorFilter,
    usePriceFilter,
} from "@/hooks/productFilters/index";
import { useSizeFilter } from "@/hooks/productFilters/useSizeFilter";
import { Brand, Category, Color } from "@/models/product";
import { IoMdClose } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

export default function ProductFilter() {
    return (
        <div className="w-56">
            <CurrentFilters />
            <CategoryFilter />
            <BrandFilter />
            <SizeFilter />
            <ColorFilter />
            <PriceFilter />
        </div>
    );
}

function CurrentFilters() {
    const cateFilter = useCategoryFilter();
    const brandFilter = useBrandFilter();
    const sizeFilter = useSizeFilter();
    const colorFilter = useColorFilter();
    const priceFilter = usePriceFilter();
    const [searchParams, setSearchParams] = useSearchParams();

    function removeFilter(names: string[]) {
        setSearchParams((params) => {
            names.forEach((name) => {
                params.delete(name);
            });

            return params;
        });
    }

    function removeCateFilter() {
        removeFilter(["category"]);
    }

    function removeBrandFilter() {
        removeFilter(["brand"]);
    }

    function removeSizeFilter() {
        removeFilter(["size"]);
    }

    function removeColorFilter() {
        removeFilter(["color"]);
    }

    function removePriceFilter() {
        removeFilter(["price"]);
    }

    function removeFilters() {
        removeFilter(["category", "brand", "size", "color", "price"]);
        setSearchParams(searchParams);
    }

    if (
        !brandFilter.current &&
        !cateFilter.current &&
        !priceFilter.current &&
        !sizeFilter.current &&
        !colorFilter.current
    )
        return null;

    return (
        <div className="mb-10">
            <h2 className="uppercase text-2xl font-semibold">Tìm theo</h2>
            <hr className="my-4" />
            <ul>
                {cateFilter.current && (
                    <li className="mt-4">
                        <span className="mr-4">
                            <button onClick={removeCateFilter}>
                                <IoMdClose />
                            </button>
                        </span>
                        {cateFilter.getName(cateFilter.current)}
                    </li>
                )}
                {brandFilter.current && (
                    <li>
                        <span className="mr-4">
                            <button onClick={removeBrandFilter}>
                                <IoMdClose />
                            </button>
                        </span>
                        {brandFilter.getName(brandFilter.current)}
                    </li>
                )}
                {!!sizeFilter.current && (
                    <li>
                        <span className="mr-4">
                            <button onClick={removeSizeFilter}>
                                <IoMdClose />
                            </button>
                        </span>
                        Size: {sizeFilter.current}
                    </li>
                )}
                {colorFilter.current && (
                    <li>
                        <span className="mr-4">
                            <button onClick={removeColorFilter}>
                                <IoMdClose />
                            </button>
                        </span>
                        <div className="inline-flex items-center gap-2">
                            Màu:{" "}
                            <span
                                className="rounded-full size-5 border border-cyan-400"
                                style={{
                                    backgroundColor: colorFilter.getColor(colorFilter.current),
                                }}
                            />
                        </div>
                    </li>
                )}
                {priceFilter.current && (
                    <li>
                        <span className="mr-4">
                            <button onClick={removePriceFilter}>
                                <IoMdClose />
                            </button>
                        </span>
                        {priceFilter.getName(priceFilter.current)}
                    </li>
                )}
            </ul>
            <button className="mt-4 text-sky-400" onClick={removeFilters}>
                Loại bỏ tất cả lọc
            </button>
        </div>
    );
}

function CategoryFilter() {
    const { data, applyCategoryFilter, current } = useCategoryFilter();

    function handleCategory(data: Category) {
        return () => applyCategoryFilter(data.id);
    }

    return (
        <div className="">
            <h2 className="uppercase text-2xl font-semibold">Danh Mục</h2>
            <hr className="my-4" />
            <ul>
                {data?.map((d) => (
                    <li key={d.id}>
                        <button
                            onClick={handleCategory(d)}
                            className={`
                ${current == d.id ? "text-cyan-400" : "text-black"}`}
                        >
                            {d.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function BrandFilter() {
    const { data, applyBrandFilter, current } = useBrandFilter();

    function handleBrand(data: Brand) {
        return () => applyBrandFilter(data.id);
    }

    return (
        <div className="mt-10">
            <h2 className="uppercase text-2xl font-semibold">Thương hiệu</h2>
            <hr className="my-4" />
            <ul>
                {data?.map((d) => (
                    <li key={d.id}>
                        <button
                            onClick={handleBrand(d)}
                            className={`
                ${current == d.id ? "text-cyan-400" : "text-black"}`}
                        >
                            {d.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function SizeFilter() {
    const { data, applySizeFilter, current } = useSizeFilter();

    function handleSize(data: number) {
        return () => applySizeFilter(data);
    }

    return (
        <div className="mt-10">
            <h2 className="uppercase text-2xl font-semibold">Màu sắc</h2>
            <hr className="my-4" />
            <ul className="flex flex-wrap gap-2">
                {data?.map((d) => (
                    <li key={d} className="inline-block">
                        <button onClick={handleSize(d)} className="items-center">
                            <div
                                className={`rounded-sm w-6 py-1 border ${
                                    current == d
                                        ? "border-cyan-400 bg-cyan-400 text-white"
                                        : "border-black"
                                }`}
                            >
                                {d}
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ColorFilter() {
    const { data, applyColorFilter, current } = useColorFilter();

    function handleColor(data: Color) {
        return () => applyColorFilter(data.id);
    }

    return (
        <div className="mt-10">
            <h2 className="uppercase text-2xl font-semibold">Màu sắc</h2>
            <hr className="my-4" />
            <ul>
                {data?.map((d) => (
                    <li key={d.id} className="inline-block size-12">
                        <button onClick={handleColor(d)} className="size-full items-center">
                            <div
                                className={`rounded-full size-6 border mx-auto ${
                                    current == d.id ? "border-cyan-400" : "border-black"
                                }`}
                                style={{
                                    backgroundColor: d.code,
                                }}
                            ></div>
                            <small
                                className={`mx-auto ${
                                    current == d.id ? "text-cyan-400" : "text-black"
                                }`}
                            >
                                {d.name}
                            </small>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function PriceFilter() {
    const { data, applyPriceFilter, current } = usePriceFilter();

    function handlePrice(data: ProductPriceFilter) {
        return () => applyPriceFilter(data);
    }

    return (
        <div className="mt-10">
            <h2 className="uppercase text-2xl font-semibold">Mức Giá</h2>
            <hr className="my-4" />
            <ul>
                {data?.map((d) => (
                    <li key={d.id}>
                        <button
                            onClick={handlePrice(d.id)}
                            className={`
                ${current == d.id ? "text-cyan-400" : "text-black"}`}
                        >
                            {d.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
