"use client";
import SolarDataComponent from "@/components/SolarActivity/SolarData";
import { useSatelliteStore } from "@/lib/store";

export default function Page() {
    const satellites = useSatelliteStore((state) => state.Satellites);

    return (
        <div className="m-10 flex flex-col space-y-10">
            <SolarDataComponent />
        </div>
    );
}
