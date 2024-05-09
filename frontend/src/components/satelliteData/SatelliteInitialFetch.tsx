"use client";
import { SatelliteEntry, useSatelliteStore } from "@/lib/store";
import { useEffect } from "react";

interface SatelliteInitialClientFetchProps {
    satData: SatelliteEntry[];
}

/* 
This is a component that initializes the Zustand store with satellite data
fetched from the server. It is used in the layout to fetch satellite data
serverside and set it in the store.
*/
export default function InitializeZustandWithSatEntries({
    satData,
}: SatelliteInitialClientFetchProps) {
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
