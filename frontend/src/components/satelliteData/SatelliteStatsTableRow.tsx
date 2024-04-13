"use client";
import { useState, useEffect } from "react";
import { convertSatrec, SatelliteInfo } from "@/lib/convertSatrec";
import { useSatelliteStore } from "@/lib/store";
import Link from "next/link";

const updateInterval = 10;

export default function SatelliteStatsTableRow({
    satName,
    slug,
}: {
    satName: string;
    slug: string;
}) {
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
            <tr>
                <td className="px-6 py-4">Loading...</td>
                <td className="px-6 py-4">Loading...</td>
                <td className="px-6 py-4">Loading...</td>
                <td className="px-6 py-4">Loading...</td>
                <td className="px-6 py-4">Loading...</td>
            </tr>
        );
    }
    return (
        <tr className="duration-150 hover:bg-white hover:text-black">
            <td className="px-6 py-4">
                <Link href={`/satellites/${slug}`} className="w-full">
                    {satName}
                </Link>
            </td>
            <td className="px-6 py-4">
                <Link href={`/satellites/${slug}`} className="w-full">
                    {satelliteInfo.velocity + " km/s"}
                </Link>
            </td>
            <td className="px-6 py-4">
                <Link href={`/satellites/${slug}`} className="w-full">
                    {satelliteInfo.altitude + " km"}
                </Link>
            </td>
            <td className="px-6 py-4">
                <Link href={`/satellites/${slug}`} className="w-full">
                    {satelliteInfo.latitudeDeg + "° N"}
                </Link>
            </td>
            <td className="px-6 py-4">
                <Link href={`/satellites/${slug}`} className="w-full">
                    {satelliteInfo.longitudeDeg + "° E"}
                </Link>
            </td>
        </tr>
    );
}
