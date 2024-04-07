"use client";
import { useState, useEffect } from "react";
import { convertSatrec, SatelliteInfo } from "@/lib/convertSatrec";
import { useSatelliteStore } from "@/lib/store";

const updateInterval = 1000;

export default function SatelliteDataHome() {
    const { satelliteData, fetchAndSetSatelliteData, selectedSatellite } =
        useSatelliteStore();
    const [satelliteInfo, setSatelliteInfo] = useState<SatelliteInfo | null>(
        null,
    );

    // Fetch satellite data on component mount or when selectedSatellite changes
    useEffect(() => {
        if (selectedSatellite) {
            fetchAndSetSatelliteData(selectedSatellite);
        }
    }, [fetchAndSetSatelliteData, selectedSatellite]);

    // Update satellite info every `updateInterval` ms
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (selectedSatellite) {
                // Access satellite data by name
                const satData = satelliteData[selectedSatellite];
                if (satData) {
                    const updatedInfo = convertSatrec(
                        satData.satrec,
                        satData.name,
                    );
                    setSatelliteInfo(updatedInfo);
                    console.log(satData.name);
                }
            }
        }, updateInterval);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [satelliteData, selectedSatellite]);

    // Display loading message if satellite info is not available
    if (!satelliteInfo) {
        return (
            <div>
                <div className="grid grid-cols-2 gap-0.5">
                    <div className="bg-black p-5">
                        <p className="text-xl font-medium">loading...</p>
                        <p className="text-gray-400">Velocity</p>
                    </div>
                    <div className="bg-black p-5">
                        <p className="text-xl font-medium">loading...</p>
                        <p className="text-gray-400">Altitude</p>
                    </div>
                    <div className="bg-black p-5">
                        <p className="text-xl font-medium">loading...</p>
                        <p className="text-gray-400">Latitude</p>
                    </div>
                    <div className="bg-black p-5">
                        <p className="text-xl font-medium">loading...</p>
                        <p className="text-gray-400">Longitude</p>
                    </div>
                </div>

                <div className="mt-0.5 bg-black p-5">
                    <div>
                        <p className="text-xl font-medium">loading...</p>
                    </div>
                    <div>
                        <p className="text-gray-400">Flag Icon</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-2 gap-0.5">
                <div className="bg-black p-5">
                    <p className="text-xl font-medium">
                        {satelliteInfo.velocity} km/h
                    </p>
                    <p className="text-gray-400">Velocity</p>
                </div>
                <div className="bg-black p-5">
                    <p className="text-xl font-medium">
                        {satelliteInfo.altitude} km
                    </p>
                    <p className="text-gray-400">Altitude</p>
                </div>
                <div className="bg-black p-5">
                    <p className="text-xl font-medium">
                        {satelliteInfo.latitudeDeg}° N
                    </p>
                    <p className="text-gray-400">Latitude</p>
                </div>
                <div className="bg-black p-5">
                    <p className="text-xl font-medium">
                        {satelliteInfo.longitudeDeg}° E
                    </p>
                    <p className="text-gray-400">Longitude</p>
                </div>
            </div>

            <div className="mt-0.5 bg-black p-5">
                <div>
                    <p className="text-xl font-medium">
                        Above {satelliteInfo.country}
                    </p>
                </div>
                <div>
                    <p className="text-gray-400">Flag Icon</p>
                </div>
            </div>
        </div>
    );
}
