import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getTitle } from "@/utils";

export default function useTitle() {
    const location = useLocation();

    useEffect(() => {
        const prevTitle = document.title;
        const title = getTitle(location.pathname);

        document.title = `${import.meta.env.VITE_APPNAME} ${title ? `- ${title}` : ""}`;

        return () => {
            document.title = prevTitle;
        };
    }, [location]);
}
