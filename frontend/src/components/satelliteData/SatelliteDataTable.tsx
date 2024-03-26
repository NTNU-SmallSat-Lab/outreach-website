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
import globeData from "@components/map/githubglobe/files/globe-data.json";
import { loader } from "@/app/loaders/satelliteData";

const satellitesShown = 10; // Maximum number of satellites to display
const timeInterval = 1000; // Time interval for updating satellite positions in milliseconds

// Extends SatelliteData with calculated position properties
interface SatelliteDataWithPosition extends SatelliteData {
    latitudeDeg: string;
    longitudeDeg: string;
    altitude: string;
    velocity: string;
}

export default function SatelliteDataTable() {
    const [satData, setSatData] = useState<SatelliteDataWithPosition[]>([]);

    useEffect(() => {
        loader("Hypso");
        // Updates satellite positions at specified intervals
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
                        const gmst = satellite.gstime(new Date()); // Calculates Greenwich Mean Sidereal Time
                        const positionGd = satellite.eciToGeodetic(
                            positionAndVelocity.position,
                            gmst,
                        );

                        // Extracts velocity from positionAndVelocity if it is not false
                        var velocityEci = positionAndVelocity.velocity;

                        if (typeof velocityEci !== "boolean") {
                            // Calculate the magnitude of the velocity vector if velocityEci is not false
                            var velocityMagnitude = Math.sqrt(
                                velocityEci.x * velocityEci.x +
                                    velocityEci.y * velocityEci.y +
                                    velocityEci.z * velocityEci.z,
                            );

                            // Convert velocity from kilometers per second (km/s) to kilometers per hour (km/h)
                            velocityMagnitude = velocityMagnitude * 3600;
                        } else {
                            // Set velocityMagnitude to NaN if velocityEci is false
                            velocityMagnitude = NaN;
                        }

                        // Converts geodetic position to readable format
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
                            velocity: velocityMagnitude.toFixed(0),
                        };
                    } else {
                        return {
                            ...data,
                            latitudeDeg: "N/A",
                            longitudeDeg: "N/A",
                            altitude: "N/A",
                            velocity: "N/A",
                        };
                    }
                });

            setSatData(updatedData);
        };

        // Performs an initial update and sets the interval for further updates
        updateSatellitePositions();
        const intervalId = setInterval(() => {
            updateSatellitePositions();
        }, timeInterval);

        // Cleans up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="m-10 flex w-full flex-col items-center justify-center">
            <Table className="w-1/2">
                <TableCaption>Satellite Data</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/6">Satellite</TableHead>
                        <TableHead className="w-1/6">Latitude</TableHead>
                        <TableHead className="w-1/6">Longitude</TableHead>
                        <TableHead className="w-1/6">Altitude</TableHead>
                        <TableHead className="w-1/6">Velocity</TableHead>
                        <TableHead className="w-1/6">Country</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {satData.map((data, index) => {
                        let country = "Ocean"; // Default to Ocean if no country is found
                        globeData.features.forEach((countryFeature) => {
                            // Checks if the satellite is within a country's bounding box to reduce the number of polygons to check
                            const boundingBoxPoints = [
                                {
                                    lat: countryFeature.bbox[1],
                                    lng: countryFeature.bbox[0],
                                },
                                {
                                    lat: countryFeature.bbox[3],
                                    lng: countryFeature.bbox[0],
                                },
                                {
                                    lat: countryFeature.bbox[3],
                                    lng: countryFeature.bbox[2],
                                },
                                {
                                    lat: countryFeature.bbox[1],
                                    lng: countryFeature.bbox[2],
                                },
                            ];

                            if (
                                PolyUtil.containsLocation(
                                    {
                                        lat: Number(data.latitudeDeg),
                                        lng: Number(data.longitudeDeg),
                                    },
                                    boundingBoxPoints,
                                )
                            ) {
                                // Handles polygons to accurately find the country
                                if (countryFeature.geometry.type == "Polygon") {
                                    let boundingPolygon =
                                        countryFeature.geometry.coordinates[0].map(
                                            (coordinate) => ({
                                                lat: Number(coordinate[1]),
                                                lng: Number(coordinate[0]),
                                            }),
                                        );

                                    if (
                                        PolyUtil.containsLocation(
                                            {
                                                lat: Number(data.latitudeDeg),
                                                lng: Number(data.longitudeDeg),
                                            },
                                            boundingPolygon,
                                        )
                                    ) {
                                        country =
                                            countryFeature.properties.ADMIN;
                                    }
                                } else if (
                                    countryFeature.geometry.type ==
                                    "MultiPolygon"
                                ) {
                                    // Loop through each polygon array in the MultiPolygon
                                    const multiPolygon = countryFeature.geometry
                                        .coordinates as number[][][][];
                                    multiPolygon.forEach((polygon) => {
                                        let boundingPolygon = polygon[0].map(
                                            (coordinate) => ({
                                                lat: Number(coordinate[1]),
                                                lng: Number(coordinate[0]),
                                            }),
                                        );

                                        if (
                                            PolyUtil.containsLocation(
                                                {
                                                    lat: Number(
                                                        data.latitudeDeg,
                                                    ),
                                                    lng: Number(
                                                        data.longitudeDeg,
                                                    ),
                                                },
                                                boundingPolygon,
                                            )
                                        ) {
                                            country =
                                                countryFeature.properties.ADMIN;
                                        }
                                    });
                                }
                            }
                        });

                        return (
                            <TableRow key={index}>
                                <TableCell>{data.name}</TableCell>
                                <TableCell>{data.latitudeDeg}° N</TableCell>
                                <TableCell>{data.longitudeDeg}° E</TableCell>
                                <TableCell>
                                    {(Number(data.altitude) * 10).toFixed(0)}{" "}
                                    moh
                                </TableCell>
                                <TableCell>{data.velocity} km/h</TableCell>
                                <TableCell>{country}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
