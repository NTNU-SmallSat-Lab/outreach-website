"use client";
import React from "react";
import { useSatelliteStore } from "@/lib/store";
import SatDropdown from "@/components/homeComponents/SatDropdown";

export default function SatelliteSelector() {
    const satelliteNames = useSatelliteStore((state) => state.satelliteNames);
    const selectedSatellite = useSatelliteStore(
        (state) => state.selectedSatellite,
    );
    const setSelectedSatellite = useSatelliteStore(
        (state) => state.setSelectedSatellite,
    );

    return (
        <div className="m-0 w-full border-b border-gray-600 p-0">
            <SatDropdown
                satelliteNames={satelliteNames}
                selectedSatellite={selectedSatellite}
                setSelectedSatellite={setSelectedSatellite}
            />
        </div>
    );
}
