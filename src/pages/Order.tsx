import { useCartStore } from "@/stores/cartStore";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function Order() {
    const carts = useCartStore((s) => s.carts);
    const navigate = useNavigate();

    const totalPrice = useMemo(() => {
        return carts.reduce((prev, cur) => prev + cur.product.price * cur.quantity, 0);
    }, [carts]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        navigate("/orderSuccess/223");
    }

    return (
        <div className="bg-white py-24">
            <div className="container">
                <h1 className="text-4xl font-bold text-center uppercase">Thanh Toán</h1>
                <form className="flex flex-col xl:flex-row gap-10 mt-20" onSubmit={handleSubmit}>
                    <fieldset className="border p-10 rounded-md drop-shadow-md flex-1">
                        <h2 className="text-2xl font-semibold">Thông tin giao hàng</h2>
                        <div className="flex flex-col mt-4">
                            <label htmlFor="recipient">Người nhận *</label>
                            <input
                                type="text"
                                id="recipient"
                                name="recipient"
                                className="bg-gray-200 p-2 rounded-md min-w-80"
                                required
                            />
                        </div>
                        <div className="flex flex-col mt-4">
                            <label htmlFor="phoneNumber">Điện thoại *</label>
                            <input
                                type="text"
                                inputMode="numeric"
                                name="phoneNumber"
                                id="phoneNumber"
                                pattern="(84|0)[35789][0-9]{8}"
                                className="bg-gray-200 p-2 rounded-md min-w-80"
                                placeholder="Nhập số điện thoại"
                                required
                            />
                        </div>
                        <div className="flex flex-col mt-4">
                            <label htmlFor="address">Địa chỉ *</label>
                            <textarea
                                rows={3}
                                id="address"
                                name="address"
                                className="bg-gray-200 p-2 rounded-md min-w-80"
                                required
                            />
                        </div>
                    </fieldset>

                    <fieldset className="border p-10 rounded-md drop-shadow-md h-min flex-1">
                        <h2 className="text-2xl font-semibold">Phương thức thanh toán</h2>
                        <div className="flex items-center gap-2 mt-4">
                            <input
                                type="radio"
                                name="payment-method"
                                id="payment-method-cod"
                                required
                            />
                            <label htmlFor="payment-method-cod">Thanh toán khi nhận hàng</label>
                        </div>
                    </fieldset>

                    <fieldset className="border p-10 rounded-md drop-shadow-md h-min flex-1">
                        <div className="flex justify-between items-end">
                            <h2 className="text-2xl font-semibold">Thành tiền</h2>
                            <div className="text-xl text-cyan-400">{totalPrice} đ</div>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-4 bg-cyan-400 rounded-md mt-4 text-white text-xl font-semibold"
                        >
                            Đặt mua
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}
