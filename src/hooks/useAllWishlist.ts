import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import * as wishlistApi from "@apis/wishlist";
import type { Product, Wishlist } from "@/models/product";

export function useAllWishlist() {
    const [wishlist, setWishlist] = useState<(Wishlist & { product: Product })[]>([]);
    const { data } = useQuery({
        queryKey: ["get-all-wishlist"],
        queryFn: wishlistApi.getAllWishlist,
    });

    const removeWishlistMutation = useMutation({
        mutationKey: ["remove-wishlist"],
        mutationFn: wishlistApi.removeWishlist,
    });

    useEffect(() => {
        if (data) {
            setWishlist(data);
        }
    }, [data]);

    const removeWishlist = useCallback(
        (wishlistId: string) => {
            if (wishlistId) {
                removeWishlistMutation.mutateAsync(wishlistId).then(() => {
                    setWishlist((allWishlist) => {
                        const findIndex = allWishlist.findIndex((e) => e.id == wishlistId);
                        if (findIndex != -1) {
                            allWishlist.splice(findIndex, 1);
                        }
                        return [...allWishlist];
                    });
                });
            }
        },
        [wishlist]
    );

    return {
        wishlist,
        isLoading: removeWishlistMutation.isPending,
        removeWishlist,
    };
}
