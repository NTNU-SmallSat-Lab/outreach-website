"use client";
import { useState, useEffect } from "react";
import { convertSatrec, SatelliteInfo } from "@/lib/convertSatrec";
import { useSatelliteStore } from "@/lib/store";
import { TableCell, TableRow } from "@/components/shadcn/table";
import type { SatelliteNumber, SatelliteName } from "@/lib/store";

const updateInterval = 50;

/**
 * Represents a table row displaying satellite statistics.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {SatelliteName} props.satName - The name of the satellite.
 * @param {SatelliteNumber} props.satNum - The number of the satellite.
 * @param {Function} props.handleRowClick - The callback function to handle row click event.
 * @returns {JSX.Element} The rendered table row component.
 */
export default function SatelliteStatsTableRow({
    satName,
    satNum,
    handleRowClick,
}: {
    satName: SatelliteName;
    satNum: SatelliteNumber;
    handleRowClick: () => void;
}) {
    const { satNumToEntry, setSelectedSatellite } = useSatelliteStore();
    const [satelliteInfo, setSatelliteInfo] = useState<SatelliteInfo>();

    // Update satellite info every `updateInterval` ms
    useEffect(() => {
        const intervalId = setInterval(() => {
            // Access satellite data by name
            const satData = satNumToEntry[satNum];

            if (satData) {
                const updatedInfo = convertSatrec(satData.satrec, satData.name);
                setSatelliteInfo(updatedInfo);
            }
        }, updateInterval);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [satNumToEntry, satName, satNum]);

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
                setSelectedSatellite(satNum);
                handleRowClick();
            }}
            data-testid="satellitesTableRow"
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
