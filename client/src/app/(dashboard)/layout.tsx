"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/AppSidebar";
import React from "react";
import { useAuth } from "../context/AuthContext";
import PrivateRoute from "../context/PrivateRoute";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { authUser } = useAuth();

    return (
        <PrivateRoute>
            <SidebarProvider>
                <div className="min-h-screen w-full bg-[#f1f1f2]">
                    <div>
                        <main className="flex">
                            <Sidebar userType={authUser?.userRole ?? "principal"} />
                            <div className="flex-grow transition-all duration-300">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </SidebarProvider>
        </PrivateRoute>
    );
};

export default DashboardLayout;