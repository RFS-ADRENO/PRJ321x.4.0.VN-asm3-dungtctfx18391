import { IoIosCart } from "react-icons/io";

import Dropdown, { type Option } from "@/components/Dropdown";
import ProductSearchBar from "@/components/ProductSearchBar";
import { useBrandFilter } from "@/hooks/productFilters/useBrandFilter";
import logo from "@assets/logo-1.png";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useUserStore } from "@/stores/userStore";
import { useCartQuery } from "@/hooks/cart/useCartQuery";

export default function Header() {
    const location = useLocation();
    const { data, applyBrandFilter } = useBrandFilter();
    const [params] = useSearchParams();
    const brand = params.get("brand") ?? undefined;

    const { carts } = useCartQuery();

    const user = useUserStore((s) => s.user);
    const setUser = useUserStore((s) => s.setUser);

    function handleBrandDropdown(data: Option) {
        applyBrandFilter(data.value);
    }

    const dropdownData =
        data?.map((e) => ({
            name: e.name,
            value: e.id,
        })) ?? [];

    function signout() {
        setUser();
    }

    return (
        <header className="sticky top-0 z-20">
            <div className="bg-black text-zinc-400sticky top-0">
                <div className="container flex h-10 items-center justify-between">
                    <div></div>
                    <nav>
                        <ul className="flex gap-4 uppercase text-white">
                            <li>
                                <Link
                                    to={"/wishlist"}
                                    className="hover:text-zinc-200 transition-colors data-[active=true]:text-zinc-200"
                                    data-active={location.pathname == "/wishlist"}
                                >
                                    Yêu thích
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={"/carts"}
                                    className="hover:text-zinc-200 transition-colors data-[active=true]:text-zinc-200"
                                    data-active={location.pathname == "/cart"}
                                >
                                    Giỏ Hàng
                                </Link>
                            </li>
                            {!user ? (
                                <>
                                    <li>
                                        <Link
                                            to={"/auth/signup"}
                                            className="hover:text-zinc-200 transition-colors data-[active=true]:text-zinc-200"
                                            data-active={location.pathname == "/auth/signup"}
                                        >
                                            Đăng Ký
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={"/auth/signin"}
                                            className="hover:text-zinc-200 transition-colors data-[active=true]:text-zinc-200"
                                            data-active={location.pathname == "/auth/signin"}
                                        >
                                            Đăng Nhập
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            to={"/profile"}
                                            className="hover:text-zinc-200 transition-colors data-[active=true]:text-zinc-200"
                                            data-active={location.pathname == "/auth/signin"}
                                        >
                                            Tài Khoản
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            className="hover:text-zinc-200 transition-colors"
                                            onClick={signout}
                                        >
                                            ĐĂNG XUẤT
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="bg-white text-black">
                <div className="container h-20 flex items-center gap-10">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>

                    <div className="w-36">
                        <Dropdown
                            placeholder="Thương Hiệu"
                            data={dropdownData}
                            onChange={handleBrandDropdown}
                            fixedPlaceholder={true}
                            selected={brand}
                        />
                    </div>
                    <ProductSearchBar />
                    <Link
                        to={"/products"}
                        className="text-lg hover:opacity-80 transition-opacity underline"
                    >
                        Sản Phẩm
                    </Link>
                    <Link
                        to={"/carts"}
                        className="relative size-10 flex justify-center items-center"
                    >
                        <span className="absolute top-0 right-0 flex justify-center items-center size-4 bg-red-500 rounded-full text-white">
                            {carts.length}
                        </span>
                        <IoIosCart size={28} />
                    </Link>
                </div>
            </div>
        </header>
    );
}
