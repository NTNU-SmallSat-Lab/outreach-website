"use client";
import GeoCustom from "./2dMapProjection";
import { useSatelliteStore } from "@/lib/store";
import React, { useState, useEffect } from "react";
import { SatelliteInfo, convertSatrec } from "@/lib/convertSatrec";

const updateInterval = 10;

export default function Map2d({ satName }: { satName: string }) {
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

    // Convert string values to numbers
    const satLatitude = satelliteInfo
        ? parseFloat(satelliteInfo.latitudeDeg)
        : undefined;
    const satLongitude = satelliteInfo
        ? parseFloat(satelliteInfo.longitudeDeg)
        : undefined;

    const width = 960;
    const height = width / 2;

    return (
        <div className="">
            <GeoCustom
                width={width}
                height={height}
                satLatitude={satLatitude}
                satLongitude={satLongitude}
            />
        </div>
    );
}
