"use client";
import { useState, useEffect } from "react";
import { convertSatrec, SatelliteInfo } from "@/lib/convertSatrec";
import { SatelliteNumber, useSatelliteStore } from "@/lib/store";
import { Table, TableBody, TableCell, TableRow } from "@shadcn/table";

const updateInterval = 50;

export default function SatelliteStatsTable({
    satName,
    satNum,
    missionStatus,
}: {
    satName: string;
    satNum: SatelliteNumber;
    missionStatus: string;
}) {
    const { satNumToEntry } = useSatelliteStore();
    const [satelliteInfo, setSatelliteInfo] = useState<SatelliteInfo | null>(
        null,
    );

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
            <div className="m-20">
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <Table className="mx-auto w-full border-collapse border">
            <TableBody>
                <TableRow>
                    <TableCell className="text-left" colSpan={2}>
                        <p>{missionStatus}</p>
                        <p className="">{"Mission Status"}</p>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="w-1/2 border p-2">
                        <p>{satelliteInfo.velocity + " Km/s"}</p>
                        <p className="">{"Speed"}</p>
                    </TableCell>
                    <TableCell className="border p-2">
                        <p>{satelliteInfo.altitude + " km"}</p>
                        <p className="">{"Altitude"}</p>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border p-2">
                        <p>{satelliteInfo.latitudeDeg + "° N"}</p>
                        <p className="">{"Latitude"}</p>
                    </TableCell>
                    <TableCell className="border p-2">
                        <p>{satelliteInfo.longitudeDeg + "° E"}</p>
                        <p className="">{"Longitude"}</p>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="text-left" colSpan={2}>
                        <p className="text-m">
                            {"Above " + satelliteInfo.country}
                        </p>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

import type { SVGProps } from "react";

export function MaterialSymbolsSpeedOutline(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={192}
            height={192}
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                fill="currentColor"
                d="M10.45 15.5q.6.6 1.55.588t1.4-.688L19 7l-8.4 5.6q-.675.45-.712 1.375t.562 1.525M12 4q1.475 0 2.838.412T17.4 5.65l-1.9 1.2q-.825-.425-1.712-.637T12 6Q8.675 6 6.337 8.338T4 14q0 1.05.288 2.075T5.1 18h13.8q.575-.95.838-1.975T20 13.9q0-.9-.213-1.75t-.637-1.65l1.2-1.9q.75 1.175 1.188 2.5T22 13.85t-.325 2.725t-1.025 2.475q-.275.45-.75.7t-1 .25H5.1q-.525 0-1-.25t-.75-.7q-.65-1.125-1-2.387T2 14q0-2.075.788-3.887t2.15-3.175t3.187-2.15T12 4m.175 7.825"
            ></path>
        </svg>
    );
}
