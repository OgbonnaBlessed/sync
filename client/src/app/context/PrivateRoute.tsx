"use client";

import { useAuth } from "./AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { authUser, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !authUser) {
            router.push(`/login?redirect=${pathname}`);
        }
    }, [authUser, loading, pathname, router]);

    if (loading || !authUser) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <p className="text-gray-600 text-lg">Loading...</p>
            </div>
        );
    }

    return <>{children}</>;
};

export default PrivateRoute;