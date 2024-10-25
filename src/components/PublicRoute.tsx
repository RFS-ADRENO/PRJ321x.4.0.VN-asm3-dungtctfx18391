import { Outlet, useLocation } from "react-router-dom";
import Header from "@layouts/Header";
import About from "@layouts/About";
import { getTitle } from "@/utils";
import Footer from "@pages/Footer";

const noAboutPages = ["/", "/search", "/products", "/product"];

export default function PublicRoute() {
    const { pathname } = useLocation();
    const hasAbout = !noAboutPages.some((path) => pathname.startsWith(path));

    return (
        <>
            <Header />
            {hasAbout && <About title={getTitle(pathname)} pathname={pathname} />}
            <Outlet />
            <Footer />
        </>
    );
}
