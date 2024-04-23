"use client";
import { SatelliteEntry, useSatelliteStore } from "@/lib/store";
import { useEffect } from "react";

interface SatelliteInitialClientFetchProps {
    satData: SatelliteEntry[]; // Adjusted to possibly include 'selected'
}

export default function SatelliteInitialClientFetch({
    satData,
}: SatelliteInitialClientFetchProps) {
    const setSatellites = useSatelliteStore((state) => state.setSatellites);

    useEffect(() => {
        // Convert incoming data to the expected format by the store
        const satellites = satData.map((sat) => ({
            name: sat.name,
            num: sat.num,
            data: sat.data, // Assuming data is optional and handled correctly by setSatellites
        }));

        // Set the satellite data in the store with potential initial data and selected satellite
        setSatellites(satellites);
    }, [satData, setSatellites]);

    return <></>; // The component doesn't render anything
}
