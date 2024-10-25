import { User } from "@/stores/userStore";
import { api } from "../api";

export function signIn(data: { email: string; password: string }) {
    return import.meta.env.DEV
        ? api
              .get<User[]>("/users", {
                  params: {
                      email: data.email,
                  },
              })
              .then((res) => {
                  if (res.data.length == 0) throw new Error("Tài khoản hoặc mật khẩu không đúng");
                  return res.data[0];
              })
        : api.post<User>("/auth/signin", data).then((res) => res.data);
}
