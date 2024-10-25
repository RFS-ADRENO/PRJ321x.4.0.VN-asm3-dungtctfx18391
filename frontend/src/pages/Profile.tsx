import { getOrders } from "@/apis/orders";
import { useUserStore } from "@/stores/userStore";
import { getPaymentStatusString, getShippingStatusString } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function Profile() {
    const user = useUserStore((s) => s.user)!;

    const { data } = useQuery({
        queryKey: ["get-orders"],
        queryFn: getOrders,
    });

    return (
        <div className="bg-white py-24">
            <div className="container">
                <h1 className="text-4xl font-semibold text-center">Tài khoản của tôi</h1>
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold">Quản lý đơn hàng</h2>
                    <table className="w-full text-base text-left rtl:text-right text-gray-500 mt-4">
                        <thead className="uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Mẫ đơn hàng
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ngày mua
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Trạng thái thanh toán
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Trạng thái vận chuyển
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tổng tiền
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((order) => {
                                const totalPrice = order.orderProducts.reduce(
                                    (prev, acc) => prev + acc.quantity * acc.price,
                                    0
                                );
                                return (
                                    <tr className="bg-white border-b" key={order.id}>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            <Link to={`/order/${order.id}`} className="text-cyan-400">#{order.id}</Link>
                                        </th>
                                        <td className="px-6 py-4">{order.date_created}</td>
                                        <td className="px-6 py-4">
                                            {getPaymentStatusString(order.paymentStatus)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getShippingStatusString(order.shippingStatus)}
                                        </td>
                                        <td className="px-6 py-4">{totalPrice.toLocaleString()} đ</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold">Thông tin tài khoản</h2>
                    <ul className="mt-4 text-lg">
                        <li className="flex">
                            <div className="w-48 font-semibold">Họ tên:</div>
                            <div>{user.name}</div>
                        </li>
                        <li className="flex">
                            <div className="w-48 font-semibold">Email:</div>
                            <div>{user.email}</div>
                        </li>
                        <li className="flex">
                            <div className="w-48 font-semibold">Số điện thoại:</div>
                            <div>{user.phoneNumber}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
