import { useCartActions } from "@/hooks/cart/useCartActions";
import { CartDetail } from "@/models/product";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";

type Props = {
    cart: CartDetail;
};

export default function Item({ cart }: Props) {
    const { incQuantity, decQuantity, deleteCart, loading } = useCartActions();

    const totalPrice = cart.product.price * cart.quantity;

    return (
        <div key={cart.id} className="border-b h-36 flex items-center justify-between gap-10">
            <div className="flex items-center gap-10">
                <img src={cart.product.image} alt="" className="aspect-square size-32" />
                <div>
                    <Link to={`/product/${cart.productId}`} className="text-cyan-400 font-semibold text-lg">{cart.product.name}</Link>
                    <div>Size: {cart.size.size}</div>
                    <div>{cart.product.versionName}</div>
                </div>
            </div>
            <div>{cart.product.price.toLocaleString()} đ</div>
            <div className="flex">
                <button
                    onClick={() => decQuantity(cart.id)}
                    className="py-3 px-4 bg-gray-300 disabled:opacity-30"
                    disabled={loading}
                >
                    -
                </button>
                <div className="py-3 px-4 bg-gray-200">{cart.quantity}</div>
                <button
                    onClick={() => incQuantity(cart.id)}
                    className="py-3 px-4 bg-gray-300 disabled:opacity-30"
                    disabled={loading}
                >
                    +
                </button>
            </div>
            <div>{totalPrice.toLocaleString()} đ</div>
            <button className="px-8 disabled:opacity-30" onClick={() => deleteCart(cart.id)} disabled={loading}>
                <IoMdTrash size={24} />
            </button>
        </div>
    );
}
