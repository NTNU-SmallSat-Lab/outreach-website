"use client";
import { useState, useEffect } from "react";
import { convertSatrec, SatelliteInfo } from "@/lib/convertSatrec";
import { useSatelliteStore } from "@/lib/store";

const updateInterval = 50;

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
                }
            }
        }, updateInterval);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [satelliteData, selectedSatellite]);

    return (
        <div>
            <div className="grid grid-cols-2 gap-0.5">
                <div className="bg-black p-5">
                    <p className="text-xl font-medium">
                        {satelliteInfo
                            ? satelliteInfo.velocity + " km/h"
                            : "Loading..."}
                    </p>
                    <p className="text-gray-400">Velocity</p>
                </div>
                <div className="bg-black p-5">
                    <p className="text-xl font-medium">
                        {satelliteInfo
                            ? satelliteInfo.altitude + " km"
                            : "Loading..."}
                    </p>
                    <p className="text-gray-400">Altitude</p>
                </div>
                <div className="bg-black p-5">
                    <p className="text-xl font-medium">
                        {satelliteInfo
                            ? satelliteInfo.latitudeDeg + "° N"
                            : "Loading..."}
                    </p>
                    <p className="text-gray-400">Latitude</p>
                </div>
                <div className="bg-black p-5">
                    <p className="text-xl font-medium">
                        {satelliteInfo
                            ? satelliteInfo.longitudeDeg + "° E"
                            : "Loading..."}
                    </p>
                    <p className="text-gray-400">Longitude</p>
                </div>
            </div>

            <div className="mt-0.5 bg-black p-5">
                <div>
                    <p className="text-xl font-medium">
                        {satelliteInfo
                            ? "Above " + satelliteInfo.country
                            : "Loading..."}
                    </p>
                </div>
                <div>
                    <p className="text-gray-400">Flag Icon</p>
                </div>
            </div>
        </div>
    );
}
