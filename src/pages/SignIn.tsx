import { signIn } from "@/apis/auths";
import { useUserStore } from "@/stores/userStore";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
    const { mutateAsync, isPending, error } = useMutation({
        mutationKey: ["signin"],
        mutationFn: signIn,
    });
    const setUser = useUserStore((s) => s.setUser);
    const navigate = useNavigate();
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        mutateAsync({
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        }).then((user) => {
            setUser(user);
            navigate("/");
        });
    }

    return (
        <div className="py-24">
            <div className="container">
                <div className="border rounded-md w-fit p-20 mx-auto shadow-lg">
                    <h2 className="text-4xl font-semibold text-center">Đăng Nhập</h2>
                    <form action="" onSubmit={handleSubmit} className="mt-10">
                        <fieldset disabled={isPending}>
                            <div>
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
                        <button
                            className="p-2 bg-black text-white rounded-md mt-10 w-full font-semibold disabled:opacity-30"
                            disabled={isPending}
                        >
                            Đăng Nhập
                        </button>
                    </form>
                    {error && <p className="text-red-500 text-center mt-2">{error.message}</p>}
                    <div className="text-center mt-10 text-lg">
                        Chưa có tài khoản?{" "}
                        <Link to="/auth/signup" className="text-sky-400">
                            Đăng Ký
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
