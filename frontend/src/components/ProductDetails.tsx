import { getProductDetails } from "@/apis/products/getProductDetail";
import { useCartActions } from "@/hooks/cart/useCartActions";
import { useWishlist } from "@/hooks/useWishlist";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { toast } from "react-toastify";

export default function ProductDetails({ productId }: { productId: string }) {
    const [chosenSize, setChosenSize] = useState("");
    const { wishlist, isLoading: isWishlistLoading, toggleWishlist } = useWishlist(productId);
    const { data, isLoading } = useQuery({
        queryKey: ["get-details", productId],
        queryFn: getProductDetails(productId),
    });

    const { addCart } = useCartActions();
    const notifyAddSuccess = () => toast.success("Đã thêm vào giỏ hàng");
    const notifyAddError = () => toast.error("Đã có lỗi xảy ra");

    const sortedSize = useMemo(() => data?.sizes.sort((a, b) => a.size - b.size) ?? [], [data]);

    useEffect(() => {
        if (sortedSize.length > 0) {
            for (const each of sortedSize) {
                if (each.quantity > 0) {
                    setChosenSize(each.id);
                    break;
                }
            }
        }
    }, [sortedSize]);

    if (isLoading || !data) return null;

    function addToCart() {
        if (data) {
            addCart(data.id, chosenSize.toString()).then(notifyAddSuccess).catch(notifyAddError);
        }
    }

    return (
        <div className="flex w-full gap-14">
            <div className="flex-1 overflow-hidden">
                <img src={data.image} alt={data.image} />
            </div>
            <div className="flex-1">
                <small className="text-gray-400 text-base">ID: {data.id}</small>
                <h1 className="font-bold text-4xl mt-4">{data.name}</h1>
                <div className="text-cyan-400 font-semibold text-3xl mt-4">
                    {data.price.toLocaleString()} đ
                </div>
                <div id="size" className="mt-12">
                    <h2 className="uppercase font-semibold text-xl">Size:</h2>
                    <ul className="mt-2 flex flex-wrap gap-2">
                        {sortedSize.map((size) => (
                            <li key={size.id}>
                                <button
                                    className={`rounded-md w-10 py-1 ${
                                        chosenSize == size.id
                                            ? "bg-cyan-400 text-white"
                                            : "bg-gray-300 text-white"
                                    } text-lg disabled:bg-opacity-20 drop-shadow-md`}
                                    onClick={() => setChosenSize(size.id)}
                                    disabled={size.quantity == 0}
                                >
                                    {size.size}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <button
                    className="uppercase text-xl font-semibold text-white bg-cyan-400 rounded-md py-4 px-8 drop-shadow-md mt-12 flex gap-6 items-center transition-transform hover:-translate-y-1"
                    onClick={addToCart}
                >
                    <FaShoppingBag size={24} />
                    chọn mua
                </button>
                <div className="mt-12">
                    <button
                        onClick={toggleWishlist}
                        className="flex gap-2 items-center"
                        disabled={isWishlistLoading}
                    >
                        {wishlist ? (
                            <IoIosHeart size={28} color="#22d3ee" />
                        ) : (
                            <IoIosHeartEmpty size={28} color="#22d3ee" />
                        )}
                        <span className="text-cyan-400 text-2xl">Yêu thích</span>
                    </button>
                </div>
                <hr className="my-8 border-2" />
                <div>
                    <h2 className="text-2xl">Thông tin</h2>
                    <ul className="mt-4 text-lg w-full">
                        <li className="inline-flex items-center gap-2 w-full">
                            <span className="text-gray-400 w-40">Màu:</span>{" "}
                            <span
                                className="rounded-full size-5 border border-black"
                                style={{
                                    backgroundColor: data.color.code,
                                }}
                            />
                        </li>
                        <li className="w-full flex">
                            <span className="text-gray-400 w-40">Thương hiệu:</span>{" "}
                            <span>{data.brand.name}</span>
                        </li>
                        <li className="w-full flex">
                            <span className="text-gray-400 w-40">Loại:</span>{" "}
                            <span>{data.cate.name}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
