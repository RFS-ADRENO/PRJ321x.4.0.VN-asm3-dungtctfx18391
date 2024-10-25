import { signUp } from "@/apis/auths";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
    const { mutateAsync, isPending, error } = useMutation({
        mutationKey: ["signup"],
        mutationFn: signUp,
    });
    const navigate = useNavigate();
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        mutateAsync({
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phoneNumber: formData.get("phoneNumber") as string,
            password: formData.get("password") as string,
        }).then(() => {
            navigate("/auth/signin");
        });
    }

    return (
        <div className="py-24">
            <div className="container">
                <div className="border rounded-md w-fit p-20 mx-auto shadow-lg">
                    <h2 className="text-4xl font-semibold text-center">Đăng Ký</h2>
                    <form action="" onSubmit={handleSubmit} className="mt-10">
                        <fieldset disabled={isPending}>
                            <div>
                                <label htmlFor="name" className="text-lg font-semibold">
                                    Tên<span className="text-red-500"> *</span>
                                </label>
                                <br />
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-200 p-2 rounded-md w-80"
                                    placeholder="Nhập tên"
                                    required
                                />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="email" className="text-lg font-semibold">
                                    Email<span className="text-red-500"> *</span>
                                </label>
                                <br />
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-200 p-2 rounded-md w-80"
                                    placeholder="Nhập email"
                                    required
                                />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="phoneNumber" className="text-lg font-semibold">
                                    Số điện thoại<span className="text-red-500"> *</span>
                                </label>
                                <br />
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    pattern="(84|0)[35789][0-9]{8}"
                                    className="bg-gray-200 p-2 rounded-md w-80"
                                    placeholder="Nhập số điện thoại"
                                    required
                                />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="password" className="text-lg font-semibold">
                                    Mật Khẩu<span className="text-red-500"> *</span>
                                </label>
                                <br />
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="bg-gray-200 p-2 rounded-md w-80"
                                    placeholder="Nhập mật khẩu"
                                    required
                                />
                            </div>
                        </fieldset>
                        {error && <p className="text-red-500 text-center mt-2">{error.message}</p>}
                        <button
                            className="p-2 bg-black text-white rounded-md mt-10 w-full font-semibold disabled:opacity-30"
                            disabled={isPending}
                        >
                            Đăng Ký
                        </button>
                    </form>
                    <div className="text-center mt-10 text-lg">
                        Đã có tài khoản?{" "}
                        <Link to="/auth/signin" className="text-sky-400">
                            Đăng Nhập
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
