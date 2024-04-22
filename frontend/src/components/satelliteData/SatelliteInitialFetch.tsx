"use client";
import { useSatelliteStore } from "@/lib/store";
import { useEffect } from "react";

interface SatelliteInitialFetchProps {
    satData: { name: string; id: string; data: any; selected?: boolean }[]; // Adjusted to possibly include 'selected'
}

export default function SatelliteInitialFetch({
    satData,
}: SatelliteInitialFetchProps) {
    const setSatellites = useSatelliteStore((state) => state.setSatellites);

    useEffect(() => {
        // Convert incoming data to the expected format by the store
        const satellites = satData.map((sat) => ({
            name: sat.name,
            id: sat.id,
            data: sat.data, // Assuming data is optional and handled correctly by setSatellites
            selected: sat.selected, // Optional, handle as boolean; ensure it's true for exactly one sat or none
        }));

        // Set the satellite data in the store with potential initial data and selected satellite
        setSatellites(satellites);
    }, [satData, setSatellites]);

    return <></>; // The component doesn't render anything
}
