export enum ProductPriceFilter {
    FROM_0_TO_1MIL = "0",
    FROM_1MIL_TO_2MIL = "1",
    FROM_2MIL_TO_3MIL = "2",
    FROM_3MIL = "3",
    NONE = "",
}

export enum ProductSortFilter {
    CREATION_DESC = "0",
    PRICE_ASC = "1",
    PRICE_DESC = "2",
}

export const MAX_PRODUCT_PER_PAGE = 20;

export enum PaymentMethod {
    COD
}

export enum PaymentStatus {
    UNPAID,
    PAID,
    REFUNDED,
    CANCELED
}

export enum ShippingStatus {
    UNVERIFIED,
    PENDING,
    SHIPPING,
    SHIPPING_2ND,
    SUCCESS,
    CANCELED
}
