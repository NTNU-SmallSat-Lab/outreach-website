import SatelliteSelector from "@/components/homeComponents/SatelliteSelector";
import SatelliteDataHome from "@/components/satelliteData/SatelliteDataHome";
import dynamic from "next/dynamic";

const SatelliteGlobeNoSSR = dynamic(
    () => import("@/components/homeComponents/homeGlobe"),
    {
        ssr: false,
    },
);

export default function GlobePage() {
    return (
        <>
            {/* Globe Section */}
            <div className="flex min-h-[calc(100vh-73px)] flex-col gap-0 sm:flex-row">
                {/* Stats Container */}
                <div className="z-10 flex w-full flex-col border-b-2 border-l-2 border-r-2 border-t-2 border-gray-600 bg-black md:min-w-[500px] xl:w-1/3">
                    <SatelliteSelector />
                    <SatelliteDataHome />
                </div>

                {/* Globe Container */}
                <div className="z-0 h-full w-full overflow-x-hidden  border-b-2 border-l-2 border-r-2 border-t-0 border-gray-600 sm:border-l-0 sm:border-t-2 xl:w-2/3">
                    <div className="flex h-[70vh] items-center justify-center sm:h-full">
                        <SatelliteGlobeNoSSR />
                    </div>
                </div>
            </div>
        </>
    );
}
