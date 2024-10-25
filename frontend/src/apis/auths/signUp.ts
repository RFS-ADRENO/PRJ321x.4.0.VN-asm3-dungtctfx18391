import { User } from "@/stores/userStore";
import { api } from "../api";

export function signUp(data: {
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
}) {
    return import.meta.env.DEV
        ? api.post<User>("/users", data).then((res) => res.data)
        : api.post<User>("/auth/signup", data).then((res) => res.data);
}
