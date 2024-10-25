import { PaymentMethod, PaymentStatus, ShippingStatus } from "./constants";

export function getTitle(pathname: string) {
    switch (pathname) {
        case "/":
            return "Trang Chủ";
        case "/auth/signup":
            return "Đăng Ký";
        case "/auth/signin":
            return "Đăng Nhập";
        case "/search":
            return "Tìm Kiếm Sản Phẩm";
        case "/products":
            return "Sản Phẩm";
        case "/carts":
            return "Giỏ Hàng";
        default:
            if (pathname.startsWith("/product/")) return "Sản Phẩm";
            return "";
    }
}

export function getPaymentMethodString(value: PaymentMethod): string {
    switch (value) {
        case PaymentMethod.COD:
            return "COD";
    }
}

export function getPaymentStatusString(value: PaymentStatus): string {
    switch (value) {
        case PaymentStatus.UNPAID:
            return "Chờ thanh toán";
        case PaymentStatus.PAID:
            return "Đã thanh toán";
        case PaymentStatus.REFUNDED:
            return "Đã hoàn tiền";
        case PaymentStatus.CANCELED:
            return "Đã hủy bỏ";
    }
}

export function getShippingStatusString(value: ShippingStatus): string {
    switch (value) {
        case ShippingStatus.UNVERIFIED:
            return "Chưa xét duyệt";
        case ShippingStatus.PENDING:
            return "Chờ giao hàng";
        case ShippingStatus.SHIPPING:
            return "Đang giao hàng";
        case ShippingStatus.SHIPPING_2ND:
            return "Đang giao hàng lần 2";
        case ShippingStatus.SUCCESS:
            return "Giao hàng thành công";
        case ShippingStatus.CANCELED:
            return "Đã hủy";
    }
}
