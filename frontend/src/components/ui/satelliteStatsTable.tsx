"use client";
import { useState, useEffect } from "react";
import { convertSatrec, SatelliteInfo } from "@/lib/convertSatrec";
import { useSatelliteStore } from "@/lib/store";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const updateInterval = 10;

export default function SatelliteStatsTable({ satName, missionStatus }: { satName: string, missionStatus: string }) {
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
                        <p>{satelliteInfo.velocity + " Km/h"}</p>
                        <p className="">{"Speed"}</p>
                    </TableCell>
                    <TableCell className="border p-2">
                        <p>{satelliteInfo.altitude + " Moh"}</p>
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
                        <p className="text-m">{"Above " + satelliteInfo.country}</p>

                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
