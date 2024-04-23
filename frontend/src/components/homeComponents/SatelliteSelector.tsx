"use client";
import React from "react";
import { useSatelliteStore } from "@/lib/store";
import SatDropdown from "@/components/homeComponents/SatDropdown";

export default function SatelliteSelector() {
    const selectedSatellite = useSatelliteStore(
        (state) => state.selectedSatellite,
    );
    const setSelectedSatellite = useSatelliteStore(
        (state) => state.setSelectedSatellite,
    );
    const setSatellites = useSatelliteStore((state) => state.setSatellites);

    const satelliteNameToNums = useSatelliteStore(
        (state) => state.satelliteNameToNum,
    );

    const satNumToEntry = useSatelliteStore((state) => state.satNumToEntry);

    let selectedSatelliteName = undefined;

    if (selectedSatellite) {
        selectedSatelliteName = satNumToEntry[selectedSatellite]?.name;
    }

    return (
        <div className="m-0 w-full border-b border-gray-600 p-0">
            <SatDropdown
                satelliteNameToNum={satelliteNameToNums}
                selectedSatellite={selectedSatellite}
                setSelectedSatellite={setSelectedSatellite}
                setSatellites={setSatellites}
                selectedSatelliteName={selectedSatelliteName}
            />
        </div>
    );
}
