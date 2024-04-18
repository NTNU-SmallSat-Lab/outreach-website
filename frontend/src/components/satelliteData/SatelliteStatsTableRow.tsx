"use client";
import { useState, useEffect } from "react";
import { convertSatrec, SatelliteInfo } from "@/lib/convertSatrec";
import { useSatelliteStore } from "@/lib/store";
import { TableCell, TableRow } from "@/components/shadcn/table";

const updateInterval = 50;

export default function SatelliteStatsTableRow({
    satName,
    handleRowClick,
}: {
    satName: string;
    handleRowClick: () => void;
}) {
    const { satelliteData, setSelectedSatellite } = useSatelliteStore();
    const [satelliteInfo, setSatelliteInfo] = useState<SatelliteInfo | null>(
        null,
    );

    // Update satellite info every `updateInterval` ms
    useEffect(() => {
        const intervalId = setInterval(() => {
            // Access satellite data by name //Fix this to work!
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
            <TableRow>
                <TableCell className="w-1/5 px-6">{satName}</TableCell>
                <TableCell className="w-1/5">Loading...</TableCell>
                <TableCell className="w-1/5">Loading...</TableCell>
                <TableCell className="w-1/5">Loading...</TableCell>
                <TableCell className="w-1/5">Loading...</TableCell>
            </TableRow>
        );
    }

    return (
        <TableRow
            className="cursor-pointer hover:bg-white hover:text-black"
            onClick={() => {
                setSelectedSatellite(satName);
                handleRowClick();
            }}
        >
            <TableCell className="w-1/5 px-6">{satName}</TableCell>
            <TableCell className=" w-1/5">
                {satelliteInfo.velocity} km/s
            </TableCell>
            <TableCell className=" w-1/5">
                {satelliteInfo.altitude} km
            </TableCell>
            <TableCell className=" w-1/5">
                {satelliteInfo.latitudeDeg}° N
            </TableCell>
            <TableCell className="w-1/5">
                {satelliteInfo.longitudeDeg}° E
            </TableCell>
        </TableRow>
    );
}
