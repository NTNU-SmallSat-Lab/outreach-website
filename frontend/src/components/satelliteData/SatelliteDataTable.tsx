"use client";
import React, { useEffect, useState } from "react";
import { exampleData } from "../map/exampleSatData";
import { SatelliteData, mapRawDataToSatData } from "@/lib/mapHelpers";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import * as satellite from "satellite.js";
import { PolyUtil } from "node-geometry-library";

const satellitesShown = 100; // Satellites in data shown
const timeInterval = 1; // Interval between updates in milliseconds

interface SatelliteDataWithPosition extends SatelliteData {
    latitudeDeg: string;
    longitudeDeg: string;
    altitude: string;
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
                        const altitude = positionGd.height;

                        return {
                            ...data,
                            latitudeDeg: latitudeDeg.toFixed(2),
                            longitudeDeg: longitudeDeg.toFixed(2),
                            altitude: altitude.toFixed(2),
                        };
                    } else {
                        return {
                            ...data,
                            latitudeDeg: "N/A",
                            longitudeDeg: "N/A",
                            altitude: "N/A",
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
                        <TableHead>Altitude</TableHead>
                        <TableHead>Country</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {satData.map((data, index) => {
                        let containsSatellite = PolyUtil.containsLocation(
                            {
                                lat: Number(data.latitudeDeg),
                                lng: Number(data.longitudeDeg),
                            },
                            [
                                { lat: 0, lng: 0 },
                                { lat: 90, lng: 0 },
                                { lat: 90, lng: 90 },
                                { lat: 0, lng: 90 },
                            ],
                        );

                        return (
                            <TableRow key={index}>
                                <TableCell>{data.name}</TableCell>
                                <TableCell>{data.latitudeDeg}°</TableCell>
                                <TableCell>{data.longitudeDeg}°</TableCell>
                                <TableCell>{data.altitude} km</TableCell>
                                <TableCell>
                                    {containsSatellite ? "Norway" : "Ocean"}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
