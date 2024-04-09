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
    const fetchAndSetSatelliteData = useSatelliteStore(
        (state) => state.fetchAndSetSatelliteData,
    );

    // Fetch data for each satellite and set it in the store
    for (const satellite of satelliteNames) {
        fetchAndSetSatelliteData(satellite);
    }

    return (
        <div className="m-0 w-full p-0">
            <SatDropdown
                satelliteNames={satelliteNames}
                selectedSatellite={selectedSatellite}
                setSelectedSatellite={setSelectedSatellite}
            />
        </div>
    );
}
