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
    }, [fetchAndSetSatelliteData, satName]);

    // Update satellite info every `updateInterval` ms
    useEffect(() => {
        const intervalId = setInterval(() => {
            // Access satellite data by name
            const satData = satelliteData[satName];
            if (satData) {
                const updatedInfo = convertSatrec(satData.satrec, satData.name);
                setSatelliteInfo(updatedInfo);
            }
        }, updateInterval);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [satelliteData, satName]);

    // Display loading message if satellite info is not available
    if (!satelliteInfo) {
        return (
            <div className="m-20">
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className="m-5 rounded-lg bg-gray-800 p-6 text-white shadow-lg">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-4xl font-bold">{satelliteInfo.name}</h1>
                <div>{/* Include the dropdown arrow icon here */}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="rounded bg-gray-700 p-4">
                    <p className="text-xl">{satelliteInfo.velocity} km/s</p>
                    <p className="text-gray-400">Velocity</p>
                </div>
                <div className="rounded bg-gray-700 p-4">
                    <p className="text-xl">{satelliteInfo.altitude} km</p>
                    <p className="text-gray-400">Altitude</p>
                </div>
                <div className="rounded bg-gray-700 p-4">
                    <p className="text-xl">{satelliteInfo.latitudeDeg}° N</p>
                    <p className="text-gray-400">Latitude</p>
                </div>
                <div className="ounded bg-gray-700 p-4">
                    <p className="text-xl">{satelliteInfo.longitudeDeg}° E</p>
                    <p className="text-gray-400">Longitude</p>
                </div>
            </div>

            <div className="mt-4 rounded bg-gray-700 p-4">
                <p className="text-xl">Above {satelliteInfo.country}</p>
            </div>
            <div className="ml-4">{/* Include the flag icon here */}</div>
        </div>
    );
}
