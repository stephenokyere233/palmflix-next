import { useEffect, useState } from "react";
import Router from "next/router";

function useLoading() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = () => setLoading(true);
        const handleComplete = () => setTimeout(() => setLoading(false), 1000);


        Router.events.on("routeChangeStart", handleStart);
        Router.events.on("routeChangeComplete", handleComplete);
        Router.events.on("routeChangeError", handleComplete);

        return () => {
            Router.events.off("routeChangeStart", handleStart);
            Router.events.off("routeChangeComplete", handleComplete);
            Router.events.off("routeChangeError", handleComplete);
        };
    }, []);

    return { loading, setLoading };
}

export default useLoading;