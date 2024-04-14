import type { Metadata } from "next";

import "../styles/globals.css";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import AuthProvider from "@/context/AuthContext";



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
                        {children}
                    </AuthProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
