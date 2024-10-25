import { useAllWishlist } from "@/hooks/useAllWishlist";
import { IoTrash } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Wishlist() {
    const { wishlist, isLoading, removeWishlist } = useAllWishlist();

    function handleRemoveWishlist(wishlistId: string) {
        return () => removeWishlist(wishlistId);
    }

    return (
        <div className="bg-white py-24">
            <div className="container">
                <h1 className="text-4xl font-semibold text-center uppercase">
                    Danh sách yêu thích
                </h1>
                <div className="mt-20">
                    {wishlist.map((each) => (
                        <div key={each.id} className="flex justify-between border-b py-4">
                            <div className="flex items-start gap-10">
                                <img
                                    src={each.product.image}
                                    alt={each.product.image}
                                    className="size-28"
                                />
                                <div className="text-lg pt-4">
                                    <Link
                                        to={`/product/${each.productId}`}
                                        className="text-cyan-400 font-semibold"
                                    >
                                        {each.product.name}
                                    </Link>
                                    <div className="text-red-500">
                                        {each.product.price.toLocaleString()} đ
                                    </div>
                                </div>
                            </div>
                            <button
                                className="text-cyan-500 flex items-center gap-2 disabled:opacity-30"
                                disabled={isLoading}
                                onClick={handleRemoveWishlist(each.id)}
                            >
                                <IoTrash />
                                <span>Xóa khỏi danh sách</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
