import { useUserStore } from "@/stores/userStore";
import Header from "@layouts/Header";
import Footer from "@pages/Footer";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const user = useUserStore((s) => s.user);
    if (!user) return <Navigate to={"/auth/signin"} />;

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}
