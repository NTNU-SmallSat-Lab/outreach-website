"use client";
import { SatelliteEntry, useSatelliteStore } from "@/lib/store";
import { useEffect } from "react";
import React from "react";

interface SatelliteInitialClientFetchProps {
    satData: SatelliteEntry[];
}

/**
 * Initializes the Zustand store with satellite entries.
 * It is used in the layout to fetch satellite data serverside and set it in the store.
 *
 * @param {SatelliteInitialClientFetchProps} props - The props containing satellite data.
 * @returns {React.JSX.Element} - The component doesn't render anything.
 */
export default function InitializeZustandWithSatEntries({
    satData,
}: SatelliteInitialClientFetchProps): React.JSX.Element {
    const setSatellites = useSatelliteStore((state) => state.setSatellites);

    useEffect(() => {
        // Convert incoming data to the expected format by the store
        const satellites = satData.map((sat) => ({
            name: sat.name,
            num: sat.num,
            satrec: sat.satrec,
            timestamp: sat.timestamp,
        }));

        // Set the satellite data in the store with potential initial data and selected satellite
        setSatellites(satellites);
    }, [satData, setSatellites]);

    return <></>; // The component doesn't render anything
}
