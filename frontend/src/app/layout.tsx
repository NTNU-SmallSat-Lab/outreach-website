import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";
import { ApolloWrapper } from "@/components/wrappers/ApolloWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Small Satellite Lab",
    description: "NTNU Small Satellite Lab",
};

import ErrorBoundaryNavigation from "@/components/ErrorBoundaryNavigation";
import Starfield from "@/components/starBackground/Starfield";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn("flex min-h-screen flex-col", inter.className)}>
                <ApolloWrapper>
                    <Navbar />
                    <ErrorBoundaryNavigation>
                        <main className="flex grow flex-col">
                            <Starfield />
                            {children}
                        </main>
                    </ErrorBoundaryNavigation>
                    <Footer />
                </ApolloWrapper>
            </body>
        </html>
    );
}
