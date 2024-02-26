"use client";
import React, { useEffect, useState } from "react";
import { exampleData } from "../map/exampleSatData";
import {
    SatelliteData,
    mapRawDataToSatData,
    mapRawDataToTleData,
} from "@/lib/mapHelpers";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import * as satellite from "satellite.js";

const satellitesShown = 10; // Satellites in data shown
const timeInterval = 1; // Interval between updates in milliseconds

interface SatelliteDataWithPosition extends SatelliteData {
    latitudeDeg: string;
    longitudeDeg: string;
}

export default function SatelliteDataTable() {
    const [satData, setSatData] = useState<SatelliteDataWithPosition[]>([]);

    useEffect(() => {
        // Function to update satellite positions
        const updateSatellitePositions = () => {
            const updatedData = mapRawDataToSatData(exampleData)
                .slice(0, satellitesShown)
                .map((data) => {
                    const positionAndVelocity = satellite.propagate(
                        data.satrec,
                        new Date(),
                    );

                    if (
                        positionAndVelocity.position &&
                        typeof positionAndVelocity.position !== "boolean"
                    ) {
                        const gmst = satellite.gstime(new Date()); // Greenwich Mean Sidereal Time
                        const positionGd = satellite.eciToGeodetic(
                            positionAndVelocity.position,
                            gmst,
                        );

                        // Convert radians to degrees for latitude and longitude
                        const latitudeDeg = satellite.degreesLat(
                            positionGd.latitude,
                        );
                        const longitudeDeg = satellite.degreesLong(
                            positionGd.longitude,
                        );

                        return {
                            ...data,
                            latitudeDeg: latitudeDeg.toFixed(2),
                            longitudeDeg: longitudeDeg.toFixed(2),
                        };
                    } else {
                        return {
                            ...data,
                            latitudeDeg: "N/A",
                            longitudeDeg: "N/A",
                        };
                    }
                });

            setSatData(updatedData);
        };

        // Initial update
        updateSatellitePositions();

        // Set interval for periodic updates
        const intervalId = setInterval(() => {
            updateSatellitePositions();
        }, timeInterval);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex flex-col justify-center items-center m-10 w-full">
            <Table className="w-1/2">
                <TableCaption>Satellite Data</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Satellite</TableHead>
                        <TableHead>Latitude</TableHead>
                        <TableHead>Longitude</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {satData.map((data, index) => (
                        <TableRow key={index}>
                            <TableCell>{data.name}</TableCell>
                            <TableCell>{data.latitudeDeg}</TableCell>
                            <TableCell>{data.longitudeDeg}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
