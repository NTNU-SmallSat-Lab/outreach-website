import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import React from "react";
import { ApolloWrapper } from "@/components/wrappers/ApolloWrapper";
import InitializeZustandWithSatEntries from "@/components/satelliteData/SatelliteInitialFetch";
import ErrorBoundaryNavigation from "@/components/layout/ErrorBoundaryNavigation";
import Starfield from "@/components/layout/Starfield";
import { SatelliteEntry } from "@/lib/store";

// imports to get satellites from strapi and fetch the data serverside
import fetchSatelliteNamesAndId from "@/lib/data/fetchSatelliteNamesAndId";
import { satLoaderById } from "@/lib/getSatelliteData";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Small Satellite Lab",
    description:
        "NTNU Organization with a focus in small satellite systems, hyperspectral cameras, AI for space, and advanced communications. Pushing the boundaries of space technology from our university lab.",
    verification: {
        google: "JTCGP84XF7D1ZdhzYT6JkJ1vYX7WZru_1Wsw7Ax13fU",
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // fetch satellite names and id to be set in the store
    const satellites = await fetchSatelliteNamesAndId();
    let satData: SatelliteEntry[] = [];

    if (satellites) {
        for (const sat of satellites) {
            if (sat.num) {
                try {
                    const entry = await satLoaderById(sat.num);
                    satData.push(entry);
                } catch (e) {
                    console.error(
                        "Either CelesTrak has IP banned the server, or CelesTrak is down, or the satellite data is not available for the provided NORAD ID: " +
                            sat.num,
                    );
                }
            }
        }
    }

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn("flex min-h-screen flex-col", inter.className)}>
                <ApolloWrapper>
                    <InitializeZustandWithSatEntries satData={satData} />
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
