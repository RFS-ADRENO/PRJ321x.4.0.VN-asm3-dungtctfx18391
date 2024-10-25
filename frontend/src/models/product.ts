import { PaymentMethod, PaymentStatus, ShippingStatus } from "@/constants";

export interface Product {
    id: string;
    name: string;
    versionName: string;
    price: number;
    image: string;
    brandId: string;
    cateId: string;
    colorId: string;
}

export interface Brand {
    id: string;
    name: string;
}

export interface Category {
    id: string;
    name: string;
}

export interface Color {
    id: string;
    name: string;
    code: string;
}

export interface Size {
    id: string;
    size: number;
    quantity: number;
    productId: string;
}

export interface ProductDetails extends Product {
    sizes: Size[];
    brand: Brand;
    cate: Category;
    color: Color;
}

export interface Cart {
    id: string;
    productId: string;
    sizeId: string;
    quantity: number;
}

export interface CartDetail extends Cart {
    product: Product;
    size: Size;
}

export interface Order {
    id: string;
    date_created: string;
    recipient: string;
    phoneNumber: string;
    address: string;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    shippingStatus: ShippingStatus;
    orderProducts: OrderProduct[];
}

export interface OrderProduct {
    id: string;
    name: string;
    price: number;
    quantity: number;
    sizeId: string;
    size: number;
    orderId: string;
}

export interface Wishlist {
    id: string;
    productId: string;
}
