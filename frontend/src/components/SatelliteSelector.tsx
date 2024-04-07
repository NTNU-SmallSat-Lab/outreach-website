"use client";
import React from "react";
import { useSatelliteStore } from "@/lib/store";

export default function SatelliteSelector() {
    const satelliteNames = useSatelliteStore((state) => state.satelliteNames);
    const setSelectedSatellite = useSatelliteStore(
        (state) => state.setSelectedSatellite,
    );

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSatellite(event.target.value);
    };

    return (
        <div>
            <select
                className="block w-full cursor-pointer bg-black"
                name="satellite"
                id="satellite"
                onChange={handleChange}
            >
                {satelliteNames.map((satellite) => (
                    <option
                        className="cursor-pointer"
                        key={satellite}
                        value={satellite}
                    >
                        {satellite}
                    </option>
                ))}
            </select>
        </div>
    );
}
