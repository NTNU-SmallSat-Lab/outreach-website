"use client";
import { useSatelliteStore } from "@/lib/store";
import { useEffect } from "react";

interface SatelliteInitialFetchProps {
    satData: { name: string; id: string; data: any }[];
}

export default function SatelliteInitialFetch({
    satData,
}: SatelliteInitialFetchProps) {
    const setSatellites = useSatelliteStore((state) => state.setSatellites);
    const setSatelliteData = useSatelliteStore(
        (state) => state.setSatelliteData,
    );

    useEffect(() => {
        // Set the satellite data in the store
        setSatellites(satData);
        satData.forEach((sat) => {
            if (!sat.data) return;
            setSatelliteData(sat.name, sat.data);
        });

        console.log("Satellite data fetched and set in store", satData);
    }, [satData]);

    return <></>;
}
