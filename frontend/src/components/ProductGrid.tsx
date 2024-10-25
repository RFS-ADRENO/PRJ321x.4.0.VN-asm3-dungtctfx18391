import type { Product } from "@/models/product";
import { Link } from "react-router-dom";

type Props = {
    fetching: boolean;
    data?: Product[];
};

export default function ProductGrid({ data, fetching }: Props) {
    return (
        <div className="grid grid-cols-4 xl:grid-cols-5 gap-4">
            {fetching
                ? Array.from({ length: 8 })
                      .fill(null)
                      .map((_, i) => <ProductSkeleton key={i} />)
                : data?.map((each) => (
                      <Link to={`/product/${each.id}`} className="aspect-[4/5] group" key={each.id}>
                          <div className="relative aspect-square">
                              <img
                                  className="group-hover:blur-sm transition-all object-cover size-full"
                                  src={each.image}
                                  alt="shoe"
                              />
                              <span className="bg-sky-400 text-white px-2 py-px rounded-md uppercase top-2 left-2 absolute group-hover:opacity-0 transition-all">
                                  đang bán
                              </span>
                              <div className="absolute inset-0 size-full flex justify-center items-center opacity-0 group-hover:opacity-100">
                                  <div className="underline text-white text-lg">MUA NGAY</div>
                              </div>
                          </div>
                          <div className="py-4 text-center font-semibold">
                              <h4 className="text-lg">{each.name}</h4>
                              <div className="text-sky-500">{each.price.toLocaleString()} đ</div>
                          </div>
                      </Link>
                  ))}
        </div>
    );
}

function ProductSkeleton() {
    return (
        <div className="aspect-[4/5] bg-gray-500 animate-pulse">
            <div className="relative aspect-square">
                <div className="transition-all object-cover size-full bg-gray-400" />
            </div>
            <div className="py-4 flex justify-center items-center flex-col font-semibold px-4">
                <h4 className="text-lg bg-gray-400 h-7 w-full rounded-md"></h4>
                <div className="text-sky-500 bg-gray-400 h-6 w-20 rounded-md mt-2"></div>
            </div>
        </div>
    );
}
