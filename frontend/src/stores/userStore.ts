import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
}

export interface UserStore {
    user?: User;
    setUser: (user?: User) => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (setState) => ({
            setUser(user) {
                setState({ user });
            },
        }),
        {
            name: "user",
        }
    )
);
