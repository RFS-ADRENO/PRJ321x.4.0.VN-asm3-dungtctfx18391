import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import * as wishlistApi from "@apis/wishlist";

export function useWishlist(productId: string) {
    const [wishlistId, setWishlistId] = useState<string | null>(null);
    const [wishlist, setWishlist] = useState(false);
    const { data, isLoading } = useQuery({
        queryKey: ["get-wishlist", productId],
        queryFn: wishlistApi.getWishlist(productId),
        retry: 0,
    });

    const addWishlistMutation = useMutation({
        mutationKey: ["add-wishlist"],
        mutationFn: wishlistApi.addWishlist,
    });

    const removeWishlistMutation = useMutation({
        mutationKey: ["remove-wishlist"],
        mutationFn: wishlistApi.removeWishlist,
    });

    useEffect(() => {
        if (data) {
            setWishlist(true);
            setWishlistId(data.id);
        }
    }, [data]);

    const toggleWishlist = useCallback(() => {
        if (wishlist) {
            if (wishlistId)
                removeWishlistMutation.mutateAsync(wishlistId).then(() => {
                    setWishlist(false);
                });
        } else {
            addWishlistMutation.mutateAsync(productId).then(() => {
                setWishlist(true);
            });
        }
    }, [wishlist, wishlistId]);

    return {
        wishlist,
        isLoading: isLoading || addWishlistMutation.isPending || removeWishlistMutation.isPending,
        toggleWishlist,
    };
}
