"use client";

import { useAuth } from "./AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { authUser, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!authUser) {
                router.push(`/login?redirect=${pathname}`);
            } else {
                setIsReady(true);
            }
        }
    }, [authUser, loading, pathname, router]);

    if (loading || !isReady) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <p className="text-gray-600 text-lg">Loading...</p>
            </div>
        );
    }

    return <>{children}</>;
};

export default PrivateRoute;