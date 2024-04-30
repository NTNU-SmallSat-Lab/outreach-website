"use client";
import SatelliteSelector from "@/components/homeComponents/SatelliteSelector";
import SatelliteDataHome from "@/components/satelliteData/SatelliteDataHome";
import dynamic from "next/dynamic";

import Link from "next/link";
import { Button } from "../shadcn/button";

import { useState } from "react";
import { cn } from "@/lib/utils";

const SatelliteGlobeNoSSR = dynamic(
    () => import("@/components/homeComponents/SatelliteGlobe"),
    {
        ssr: false,
    },
);

export default function GlobeWithStats({
    homePage = false,
}: {
    homePage: boolean;
}) {
    return (
        <>
            <div
                className={`flex min-h-[calc(100vh-73px)] flex-col gap-0 sm:flex-row`}
            >
                <div className="z-10 flex w-full flex-col border-b-2 border-l-2 border-r-2 border-t-2 border-gray-600 bg-black md:min-w-[500px] xl:w-1/3">
                    <SatelliteSelector />
                    <SatelliteDataHome />
                    {homePage ? (
                        <Link href={"/globe"} className="invisible sm:visible m-4">
                            <Button>Fullscreen</Button>
                        </Link>
                    ) : (
                        <Link href={"/"} className="invisible sm:visible m-4">
                            <Button>Out of Fullscreen</Button>
                        </Link>
                    )}
                </div>

                <div className="z-0 h-full w-full overflow-x-hidden border-b-2 border-l-2 border-r-2 border-t-0 border-gray-600 sm:border-l-0 sm:border-t-2 xl:w-2/3">
                    <div
                        className={cn(
                            "flex items-center justify-center sm:h-full",
                        )}
                    >
                        <SatelliteGlobeNoSSR />
                    </div>
                </div>
            </div>

            {/* CSS for fullscreen mode */}
            <style jsx>{`
                .fullscreen-styles {
                    min-height: 100vh; // Make it take full height
                    overflow: hidden; // Hide scrollbars
                }
                // Hide other UI components like footer and navbar
                .footer,
                .navbar {
                    display: none;
                }
            `}</style>
        </>
    );
}
