import PublicRoute from "@components/PublicRoute";
import useTitle from "@hooks/useTitle";
import Home from "@pages/Home";
import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Carts from "./pages/Carts";
import Order from "./pages/Order";
import OrderSuccess from "./pages/OrderSuccess";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import OrderDetail from "./pages/OrderDetail";
import Wishlist from "./pages/Wishlist";

function App() {
    useTitle();

    return (
        <Routes>
            <Route path="/" element={<PublicRoute />}>
                <Route path="" element={<Home />} />
                <Route path="/auth/signup" element={<SignUp />} />
                <Route path="/auth/signin" element={<SignIn />} />
            </Route>
            <Route path="/" element={<ProtectedRoute />}>
                <Route path="/search" element={<Search />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/carts" element={<Carts />} />
                <Route path="/order" element={<Order />} />
                <Route path="/orderSuccess/:id" element={<OrderSuccess />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/order/:id" element={<OrderDetail />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="*" element={<Navigate to={"/"} />} />
            </Route>
        </Routes>
    );
}

export default App;
