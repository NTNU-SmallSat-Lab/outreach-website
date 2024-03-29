"use client";
import { useState, useEffect } from "react";
import { convertSatrec, SatelliteInfo } from "@/lib/convertSatrec";
import { useSatelliteStore } from "@/lib/store";

const updateInterval = 10;

export default function SatelliteDataTable({ satName }: { satName: string }) {
    const { satelliteData, fetchAndSetSatelliteData } = useSatelliteStore();
    const [satelliteInfo, setSatelliteInfo] = useState<SatelliteInfo | null>(
        null,
    );

    // Fetch satellite data on component mount
    useEffect(() => {
        fetchAndSetSatelliteData(satName);
    }, [fetchAndSetSatelliteData]);

    // Update satellite info every 10ms
    useEffect(() => {
        const updateSatelliteInfo = () => {
            if (satelliteData.length > 0) {
                const updatedInfo = convertSatrec(
                    satelliteData[0].satrec,
                    satelliteData[0].name,
                );
                setSatelliteInfo(updatedInfo);
            }
        };

        // Update immediately and then set an interval
        updateSatelliteInfo();
        const intervalId = setInterval(updateSatelliteInfo, updateInterval);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [satelliteData]);

    // Display loading message if satellite info is not available
    if (!satelliteInfo) {
        return (
            <div className="m-20">
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className="m-20 rounded-lg bg-gray-800 p-6 text-white shadow-lg">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-4xl font-bold">{satelliteInfo.name}</h1>
                <div>{/* Include the dropdown arrow icon here */}</div>
            </div>
            <p className="mb-2 text-sm">Our first satellite launched in 2022</p>

            <div className="grid grid-cols-2 gap-4">
                <div className="rounded bg-gray-700 p-4">
                    <p className="text-xl">{satelliteInfo.velocity} Km/h</p>
                    <p className="text-gray-400">Speed</p>
                </div>
                <div className="rounded bg-gray-700 p-4">
                    <p className="text-xl">{satelliteInfo.altitude} km</p>
                    <p className="text-gray-400">Altitude</p>
                </div>
                <div className="rounded bg-gray-700 p-4">
                    <p className="text-xl">{satelliteInfo.latitudeDeg}° N</p>
                    <p className="text-gray-400">Latitude</p>
                </div>
                <div className="rounded bg-gray-700 p-4">
                    <p className="text-xl">{satelliteInfo.longitudeDeg}° E</p>
                    <p className="text-gray-400">Longitude</p>
                </div>
            </div>

            <div className="mt-4 flex items-center">
                <div className="flex-1 rounded bg-gray-700 p-4">
                    <p className="text-xl">Above {satelliteInfo.country}</p>
                </div>
                <div className="ml-4">{/* Include the flag icon here */}</div>
            </div>
        </div>
    );
}
