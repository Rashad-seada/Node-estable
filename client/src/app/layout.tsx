import type { Metadata } from "next";

import "../styles/globals.css";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import AuthProvider from "@/context/AuthContext";
import ReactToastifyProvider from "@/components/providers/ReactToastifyProvider";
import RoutingProvider from "@/context/RoutingContext";



export const metadata: Metadata = {
    title: "Saifi Stable",
    description: "horses stable web application and system",
};

export default function RootLayout({children}:RootLayoutProps) {
    return (
        <html lang="en">
            <body>

                <ReactQueryProvider>
                        <AuthProvider>
                            
                            <RoutingProvider>
                                <ReactToastifyProvider>
                                    {children}
                                </ReactToastifyProvider>
                            </RoutingProvider>
                         
                        </AuthProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
