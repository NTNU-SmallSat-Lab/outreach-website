"use client";
import { useState, useEffect } from "react";
import { convertSatrec, SatelliteInfo } from "@/lib/convertSatrec";
import { useSatelliteStore } from "@/lib/store";
import { TableCell, TableRow } from "@/components/shadcn/table";
import { useRouter } from "next/navigation";

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

    const router = useRouter();

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
                <td className="px-6">Loading...</td>
                <td className="px-6">Loading...</td>
                <td className="px-6">Loading...</td>
                <td className="px-6">Loading...</td>
            </tr>
        );
    }

    function handleClick() {
        router.replace(`/satellites/${slug}`);
    }

    return (
        <TableRow
            onClick={handleClick}
            className="cursor-pointer hover:bg-white hover:text-black"
        >
            <TableCell className="px-6 py-4" style={{ width: "20%" }}>
                {satName}
            </TableCell>
            <TableCell className="px-6 py-4" style={{ width: "20%" }}>
                {satelliteInfo.velocity + " km/s"}
            </TableCell>
            <TableCell
                className="hidden px-6 py-4 lg:table-cell"
                style={{ width: "20%" }}
            >
                {satelliteInfo.altitude + " km"}
            </TableCell>
            <TableCell
                className="hidden px-6 py-4 md:table-cell"
                style={{ width: "20%" }}
            >
                {satelliteInfo.latitudeDeg + "° N"}
            </TableCell>
            <TableCell
                className="hidden px-6 py-4 md:table-cell"
                style={{ width: "20%" }}
            >
                {satelliteInfo.longitudeDeg + "° E"}
            </TableCell>
        </TableRow>
    );
}
