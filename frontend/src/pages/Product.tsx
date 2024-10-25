import ProductDetails from "@/components/ProductDetails";
import { Navigate, useParams } from "react-router-dom";

export default function Product() {
    const params = useParams();
    const productId = params["id"];

    if (productId == null) return <Navigate to={"/"} />;

    return (
        <div className="bg-white py-24">
            <div className="container">
                <ProductDetails productId={productId} />
            </div>
        </div>
    );
}
