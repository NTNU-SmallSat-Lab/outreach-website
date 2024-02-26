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

export default function SatelliteDataTable() {
    var satData = mapRawDataToSatData(exampleData).slice(0, 10);

    return (
        <div className="flex flex-col justify-center items-center m-10 w-full">
            <Table className="w-1/2">
                <TableCaption>Satellite Datas</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Satellite</TableHead>
                        <TableHead>Latitude</TableHead>
                        <TableHead>Longitude</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {satData.map((data, index) => {
                        var positionAndVelocity = satellite.propagate(
                            data.satrec,
                            new Date(),
                        );

                        // Check if position is not false before proceeding
                        if (
                            positionAndVelocity.position &&
                            typeof positionAndVelocity.position !== "boolean"
                        ) {
                            var gmst = satellite.gstime(new Date()); // Greenwich Mean Sidereal Time
                            var positionGd = satellite.eciToGeodetic(
                                positionAndVelocity.position,
                                gmst,
                            );

                            // Convert radians to degrees for latitude and longitude
                            var latitudeDeg = satellite.degreesLat(
                                positionGd.latitude,
                            );
                            var longitudeDeg = satellite.degreesLong(
                                positionGd.longitude,
                            );

                            return (
                                <TableRow key={index}>
                                    <TableCell>{data.name}</TableCell>
                                    <TableCell>
                                        {latitudeDeg.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        {longitudeDeg.toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            );
                        } else {
                            // Handle the case where propagation failed or returned false
                            return (
                                <TableRow key={index}>
                                    <TableCell>{data.name}</TableCell>
                                    <TableCell>N/A</TableCell>
                                    <TableCell>N/A</TableCell>
                                </TableRow>
                            );
                        }
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
