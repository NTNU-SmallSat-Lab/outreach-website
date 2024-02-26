"use client";
import React, { useEffect, useState } from "react";
import { exampleData } from "../map/exampleSatData";
import { SatelliteData, mapRawDataToSatData, mapRawDataToTleData } from "@/lib/mapHelpers";
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

const SATELLITE_AMOUNT = 10; // amount of satellites to display

export default function SatelliteDataTable() {
    const [satelliteDataWithCoords, setSatelliteDataWithCoords] = useState([]);

    useEffect(() => {
        let satDatas = [];
        satDatas = mapRawDataToSatData(exampleData)

        const date = new Date()


    }, []);

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
                    {satelliteDataWithCoords.map((data, index) => {
                        return (
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Latitude</TableCell>
                                <TableCell>Longitude</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
