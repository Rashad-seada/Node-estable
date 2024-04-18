import type { Metadata } from "next";

import "../styles/globals.css";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import AuthProvider from "@/context/AuthContext";
import ReactToastifyProvider from "@/components/providers/ReactToastifyProvider";

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
                        
                            <ReactToastifyProvider>
                                {children}
                            </ReactToastifyProvider>
                         
                        </AuthProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
