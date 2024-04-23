"use client";
import { useState, useEffect } from "react";
import { convertSatrec, SatelliteInfo } from "@/lib/convertSatrec";
import { useSatelliteStore } from "@/lib/store";
import { TableCell, TableRow } from "@/components/shadcn/table";
import type { SatelliteNumber, SatelliteName } from "@/lib/store";

const updateInterval = 50;

export default function SatelliteStatsTableRow({
    satName,
    SatId,
    handleRowClick,
}: {
    satName: SatelliteName;
    SatId: SatelliteNumber;
    handleRowClick: () => void;
}) {
    const { SatelliteNameToEntry, setSelectedSatellite } = useSatelliteStore();
    const [satelliteInfo, setSatelliteInfo] = useState<SatelliteInfo | null>(
        null,
    );

    // Update satellite info every `updateInterval` ms
    useEffect(() => {
        const intervalId = setInterval(() => {
            // Access satellite data by name //Fix this to work!
            const satData = SatelliteNameToEntry[satName];
            if (satData) {
                if (satData.satrec) {
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
    }, [SatelliteNameToEntry, satName]);

    // Display loading message if satellite info is not available
    if (!satelliteInfo) {
        return (
            <TableRow
                className="cursor-pointer hover:bg-white hover:text-black"
                onClick={() => {
                    handleRowClick();
                }}
            >
                <TableCell className="w-1/5 px-6">{satName}</TableCell>
                <TableCell className="hidden w-1/5 sm:table-cell">
                    Loading...
                </TableCell>
                <TableCell className="w-1/5">Loading...</TableCell>
                <TableCell className="hidden w-1/5 sm:table-cell">
                    Loading...
                </TableCell>
                <TableCell className="hidden w-1/5 sm:table-cell">
                    Loading...
                </TableCell>
            </TableRow>
        );
    }

    return (
        <TableRow
            className="cursor-pointer hover:bg-white hover:text-black"
            onClick={() => {
                setSelectedSatellite(SatId);
                handleRowClick();
            }}
        >
            <TableCell className="w-1/5 px-6">{satName}</TableCell>
            <TableCell className="hidden w-1/5 sm:table-cell">
                {satelliteInfo.velocity} km/s
            </TableCell>
            <TableCell className="w-1/5">{satelliteInfo.altitude} km</TableCell>
            <TableCell className="hidden w-1/5 sm:table-cell">
                {satelliteInfo.latitudeDeg}° N
            </TableCell>
            <TableCell className="hidden w-1/5 sm:table-cell">
                {satelliteInfo.longitudeDeg}° E
            </TableCell>
        </TableRow>
    );
}
