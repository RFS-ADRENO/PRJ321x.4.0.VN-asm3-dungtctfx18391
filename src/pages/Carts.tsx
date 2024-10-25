import Item from "@/components/Carts/Item";
import { useCartStore } from "@/stores/cartStore";
import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function Carts() {
    const carts = useCartStore((s) => s.carts);

    const totalPrice = useMemo(() => {
        return carts.reduce((prev, cur) => prev + cur.product.price * cur.quantity, 0);
    }, [carts]);

    return (
        <div className="bg-white py-24">
            <div className="container">
                <h1 className="text-4xl font-bold text-center uppercase">Giỏ Hàng</h1>
                <hr className="mt-8" />
                <div>
                    {carts.map((cart) => (
                        <Item cart={cart} key={cart.id} />
                    ))}
                </div>
                <div className="flex mt-10 gap-4 items-center justify-end">
                    <div className="text-lg">
                        Tổng: <span className="text-cyan-400">{totalPrice.toLocaleString()} đ</span>
                    </div>
                    <Link to={"/order"} className="py-2 px-8 text-xl bg-cyan-400 text-white rounded-md">
                        Đặt Hàng
                    </Link>
                </div>
            </div>
        </div>
    );
}
