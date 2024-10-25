import { Product } from "@models/product";
import { api } from "@apis/api";
import { MAX_PRODUCT_PER_PAGE, ProductPriceFilter, ProductSortFilter } from "@/constants";

export function getProducts(query: string = "", page?: number) {
    const params: Record<string, any> = {
        _limit: MAX_PRODUCT_PER_PAGE,
    };
    if (query) params.name_like = query;
    if (page) params._page = page;

    return () =>
        api
            .get<Product[]>("/products", {
                params,
            })
            .then((res) => ({
                products: res.data,
                total: parseInt(res.headers["x-total-count"]),
            }));
}

export type ProductFilter = {
    category?: string | null;
    brand?: string | null;
    color?: string | null;
    size?: string | null;
    price?: string | null;
    sort?: string | null;
    page?: string | null;
};

export function getProductsByFilter(filter: ProductFilter) {
    const params: Record<string, any> = {
        _limit: MAX_PRODUCT_PER_PAGE,
    };

    if (filter.category) params.cateId = filter.category;
    if (filter.brand) params.brandId = filter.brand;
    if (filter.color) params.colorId = filter.color;
    if (filter.size) params.size = filter.size; // this doesn't work with mockAPI
    if (filter.price) {
        Object.assign(params, getPriceParams(filter.price));
    }
    if (filter.sort) {
        Object.assign(params, getSortParams(filter.sort));
    }
    if (filter.page) {
        params._page = filter.page;
    }

    return () =>
        api
            .get<Product[]>("/products", {
                params,
            })
            .then((res) => ({
                products: res.data,
                total: parseInt(res.headers["x-total-count"]),
            }));
}

function getPriceParams(price: string) {
    switch (price) {
        case ProductPriceFilter.FROM_0_TO_1MIL:
            return { price_lte: 1_000_000 };
        case ProductPriceFilter.FROM_1MIL_TO_2MIL:
            return { price_gte: 1_000_000, price_lte: 2_000_000 };
        case ProductPriceFilter.FROM_2MIL_TO_3MIL:
            return { price_gte: 2_000_000, price_lte: 3_000_000 };
        case ProductPriceFilter.FROM_3MIL:
            return { price_gte: 3_000_000 };
        case ProductPriceFilter.NONE:
            return {};
    }
}

function getSortParams(sort: string) {
    switch (sort) {
        case ProductSortFilter.CREATION_DESC:
            return { _sort: "date_created", _order: "desc" };
        case ProductSortFilter.PRICE_ASC:
            return { _sort: "price", _order: "asc" };
        case ProductSortFilter.PRICE_DESC:
            return { _sort: "price", _order: "desc" };
    }
}
