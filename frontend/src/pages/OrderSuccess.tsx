import { Link, Navigate, useParams } from "react-router-dom";

export default function OrderSuccess() {
    const params = useParams();
    const orderId = params["id"];

    if (!orderId) return <Navigate to={"/"} />;

    return (
        <div className="bg-white py-24">
            <div className="container">
                <div className="h-96 flex flex-col items-center">
                    <h1 className="text-4xl font-semibold text-center">Đặt mua thành công</h1>
                    <p className="text-2xl text-center mt-4 text-gray-400">Cảm ơn bạn mua hàng tại {import.meta.env.VITE_APPNAME}, mã đơn hàng: <span className="text-black">#{orderId}</span></p>
                    <Link to={"/profile"} className="px-8 py-3 bg-cyan-400 text-white text-xl font-semibold mt-8 rounded-md">Xem đơn hàng</Link>
                </div>
            </div>
        </div>
    );
}
