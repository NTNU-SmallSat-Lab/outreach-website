"use client";
import SatelliteSelector from "./SatelliteSelector";
import SatelliteDataHome from "@/components/satelliteData/SatelliteDataHome";
import dynamic from "next/dynamic";

const SatelliteGlobeNoSSR = dynamic(() => import("./SatelliteGlobe"), {
    ssr: false,
});

export default function GlobeWithStats() {
    return (
        <>
            <div
                className={`flex min-h-[calc(100vh-73px)] flex-col gap-0 bg-black sm:flex-row`}
            >
                <div className="z-10 flex w-full flex-col border-b-2 border-l-2 border-r-2 border-t-2 border-gray-600 bg-black md:min-w-[500px] xl:w-1/3">
                    <SatelliteSelector />
                    <SatelliteDataHome />
                </div>

                <div className="relative z-0 h-full w-full grow overflow-x-hidden border-b-2 border-l-2 border-r-2 border-t-0 border-gray-600 bg-black sm:border-l-0 sm:border-t-2 xl:w-2/3">
                    <div className="flex h-full w-full items-center justify-center bg-black">
                        <SatelliteGlobeNoSSR />
                    </div>
                </div>
            </div>
        </>
    );
}
