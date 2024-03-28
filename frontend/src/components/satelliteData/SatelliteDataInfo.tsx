"use client";
import { useState, useEffect } from "react";
import { convertSatrec, SatelliteInfo } from "@/lib/convertSatrec";
import { useSatelliteStore } from "@/lib/store";

const updateInterval = 100000;

export default function SatelliteDataInfo() {
    const { satelliteData, fetchAndSetSatelliteData } = useSatelliteStore();
    const [satelliteInfo, setSatelliteInfo] = useState<SatelliteInfo | null>(
        null,
    );

    // Fetch satellite data on component mount
    useEffect(() => {
        fetchAndSetSatelliteData("Hypso-1");
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
        <div className="m-20">
            <h1>{satelliteInfo.name}</h1>
            <p>Latitude: {satelliteInfo.latitudeDeg}° N</p>
            <p>Longitude: {satelliteInfo.longitudeDeg}° E</p>
            <p>Altitude: {satelliteInfo.altitude} km</p>
            <p>Velocity: {satelliteInfo.velocity} km/s</p>
            <p>Country: {satelliteInfo.country}</p>
        </div>
    );
}
