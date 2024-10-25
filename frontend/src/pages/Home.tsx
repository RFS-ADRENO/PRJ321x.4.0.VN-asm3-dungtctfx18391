
import ListNewProducts from "@/components/Home/ListNewProducts";
import shoe from "@assets/slider-img-1.png";
import text from "@assets/text.png";

export default function Home() {
    return (
        <div className="">
            <div className="bg-orange-400 h-[calc(100svh-7.5rem)]">
                <div className="container relative flex items-center justify-center h-full overflow-hidden">
                    <img src={text} alt="text" />
                    <img
                        src={shoe}
                        alt="shoe"
                        className="animate-float absolute right-0 bottom-0"
                    />
                </div>
            </div>
            <div className="py-24">
                <ListNewProducts />
            </div>
        </div>
    );
}
