import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";
import { ApolloWrapper } from "@/components/wrappers/ApolloWrapper";
import SatelliteInitialFetch from "@/components/satelliteData/SatelliteInitialFetch";

// imports to get satellites from strapi and fetch the data serverside
import fetchSatelliteNamesAndId from "@/lib/data/fetchSatelliteNamesAndId";
import { satLoaderById } from "@/lib/getSatelliteData";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Small Satellite Lab",
    description: "NTNU Small Satellite Lab",
};

import ErrorBoundaryNavigation from "@/components/ErrorBoundaryNavigation";
import Starfield from "@/components/starBackground/Starfield";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // fetch satellite names and id to be set in the store in the navbar
    const satellites = await fetchSatelliteNamesAndId();
    let satData: any[] = [];

    if (satellites) {
        for (const sat of satellites) {
            if (sat.id) {
                const data = await satLoaderById(sat.id);
                satData.push({ name: sat.name, id: sat.id, data });
            }
        }
    }

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn("flex min-h-screen flex-col", inter.className)}>
                <ApolloWrapper>
                    <SatelliteInitialFetch satData={satData} />
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
