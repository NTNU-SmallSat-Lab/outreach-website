"use client";
import { useState, useEffect } from "react";
import { convertSatrec, SatelliteInfo } from "@/lib/convertSatrec";
import { SatelliteNumber, useSatelliteStore } from "@/lib/store";
import { flag } from "country-emoji";
import { cp } from "fs";
import Satellites from "@/app/satellites/page";
import { Satellite } from "@/__generated__/graphql";

const updateInterval = 50; // in ms

/**
 * Renders the SatelliteDataHome component.
 * This component displays information about a selected satellite, such as velocity, altitude, latitude, longitude, and country.
 */
export default function SatelliteDataHome({satelliteNum}: { satelliteNum: string }) {
    const { selectedSatellite, setSelectedSatellite, satNumToEntry } = useSatelliteStore();
    const [satelliteInfo, setSatelliteInfo] = useState<SatelliteInfo | null>(
        null,
    );

    // Update satellite info every `updateInterval` ms
    useEffect(() => {
        const intervalId = setInterval(() => {
            if(satelliteNum){
                const satelliteNumber = parseInt(satelliteNum, 10);
                setSelectedSatellite(satelliteNumber as SatelliteNumber);
            }
            if (selectedSatellite) {
                // Access satellite data by name
                const satData = satNumToEntry[selectedSatellite];
                if (satData && satData.satrec) {
                    // Check if satData.satrec is defined
                    const updatedInfo = convertSatrec(
                        satData.satrec,
                        satData.name,
                    );
                    setSatelliteInfo(updatedInfo);
                }
            }
        }, updateInterval);
        // Clear interval on component unmounts
        return () => clearInterval(intervalId);
    }, [satNumToEntry, selectedSatellite]);

    return (
        <div>
            <div className="grid grid-cols-2">
                <div className="border  border-l-0 border-r-0 border-gray-600 bg-black p-5">
                    <p className="text-xl font-medium">
                        {satelliteInfo
                            ? satelliteInfo.velocity + " km/s"
                            : "Loading..."}
                    </p>
                    <p className="text-gray-400">Velocity</p>
                </div>
                <div className="border  border-l-2 border-r-0 border-gray-600 bg-black p-5">
                    <p className="text-xl font-medium">
                        {satelliteInfo
                            ? satelliteInfo.altitude + " km"
                            : "Loading..."}
                    </p>
                    <p className="text-gray-400">Altitude</p>
                </div>
                <div className="border  border-l-0 border-r-0 border-gray-600 bg-black p-5">
                    <p className="text-xl font-medium">
                        {satelliteInfo
                            ? satelliteInfo.latitudeDeg + "° N"
                            : "Loading..."}
                    </p>
                    <p className="text-gray-400">Latitude</p>
                </div>
                <div className="border  border-l-2 border-r-0 border-gray-600 bg-black p-5">
                    <p className="text-xl font-medium">
                        {satelliteInfo
                            ? satelliteInfo.longitudeDeg + "° E"
                            : "Loading..."}
                    </p>
                    <p className="text-gray-400">Longitude</p>
                </div>
            </div>

            <div className="border border-b-0 border-l-0 border-r-0 border-gray-600 bg-black p-5 sm:border-b-2">
                <div>
                    <p className="text-xl font-medium">
                        {satelliteInfo
                            ? "Above " + satelliteInfo.country
                            : "Loading..."}
                        {satelliteInfo && " " + flag(satelliteInfo.country)}
                    </p>
                </div>
            </div>
        </div>
    );
}
