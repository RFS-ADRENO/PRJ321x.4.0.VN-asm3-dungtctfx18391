import { getOrderDetails } from "@/apis/orders";
import { getPaymentMethodString, getPaymentStatusString, getShippingStatusString } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

export default function OrderDetail() {
    const params = useParams();
    const orderId = params["id"];
    const navigate = useNavigate();

    const { data } = useQuery({
        queryKey: ["get-order-details", orderId],
        queryFn: getOrderDetails(orderId ?? ""),
        enabled: !!orderId,
    });

    if (!orderId) return <Navigate to={"/"} />;

    const totalPrice = useMemo(
        () => data?.orderProducts.reduce((prev, acc) => prev + acc.quantity * acc.price, 0) ?? 0,
        [data]
    );

    function handleCancelOrder() {
        // handle here
        navigate("/profile");
    }

    if (!data) return null;

    return (
        <div className="bg-white py-24">
            <div className="container">
                <div className="flex justify-between">
                    <h1 className="text-4xl font-semibold text-center">
                        Đơn hàng #{orderId} - {getShippingStatusString(data.shippingStatus)}
                    </h1>
                    <div>Ngày đặt hàng: {data.date_created}</div>
                </div>

                <hr className="my-4 border" />

                <h2 className="text-2xl font-semibold">Chi tiết</h2>
                <table className="w-full text-base text-left rtl:text-right text-gray-500 mt-4">
                    <thead className="uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Sản phẩm
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Size
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Giá
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Số lượng
                            </th>
                            <th scope="col" className="px-6 py-3 text-right">
                                Tạm tính
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.orderProducts.map((product) => {
                            const totalPrice = product.quantity * product.price;
                            return (
                                <tr
                                    className="bg-white border-b"
                                    key={`${product.id}_${product.sizeId}`}
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        <Link
                                            to={`/product/${product.id}`}
                                            className="text-cyan-400"
                                        >
                                            {product.name}
                                        </Link>
                                    </th>
                                    <td className="px-6 py-4">{product.size}</td>
                                    <td className="px-6 py-4">
                                        {product.price.toLocaleString()} đ
                                    </td>
                                    <td className="px-6 py-4">{product.quantity}</td>
                                    <td className="px-6 py-4 text-right">
                                        {totalPrice.toLocaleString()} đ
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="flex justify-end mt-4 text-lg font-semibold">
                    Tổng cộng:{" "}
                    <span className="text-red-500 ml-10 px-6 font-normal">
                        {totalPrice.toLocaleString()} đ
                    </span>
                </div>
                <hr className="mt-4" />
                <h2 className="text-2xl font-semibold mt-10">Thông tin</h2>
                <ul className="mt-4 text-lg">
                    <li className="flex">
                        <div className="w-48 font-semibold">Người nhận hàng:</div>
                        <div>{data.recipient}</div>
                    </li>
                    <li className="flex">
                        <div className="w-48 font-semibold">Địa chỉ:</div>
                        <div>{data.address}</div>
                    </li>
                    <li className="flex">
                        <div className="w-48 font-semibold">Hình thức thanh toán:</div>
                        <div>{getPaymentMethodString(data.paymentMethod)}</div>
                    </li>
                    <li className="flex">
                        <div className="w-48 font-semibold">Trạng thái thanh toán:</div>
                        <div>{getPaymentStatusString(data.paymentStatus)}</div>
                    </li>
                </ul>

                <button
                    className="rounded-md uppercase border border-cyan-400 text-cyan-400 py-2 px-6 mt-10 text-lg"
                    onClick={handleCancelOrder}
                >
                    HỦY ĐƠN HÀNG
                </button>
            </div>
        </div>
    );
}
