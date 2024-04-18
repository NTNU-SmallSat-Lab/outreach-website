"use client";
import { useState, useEffect } from "react";
import { convertSatrec, SatelliteInfo } from "@/lib/convertSatrec";
import { useSatelliteStore } from "@/lib/store";
import { TableCell, TableRow } from "@/components/shadcn/table";
import { useRouter } from "next/navigation";

const updateInterval = 50;

export default function SatelliteStatsTableRow({
    satName,
    slug,
}: {
    satName: string;
    slug: string;
}) {
    const { satelliteData, setSelectedSatellite } = useSatelliteStore();
    const [satelliteInfo, setSatelliteInfo] = useState<SatelliteInfo | null>(
        null,
    );

    const router = useRouter();

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
                <TableCell>Loading...</TableCell>
                <TableCell>Loading...</TableCell>
                <TableCell>Loading...</TableCell>
                <TableCell>Loading...</TableCell>
                <TableCell>Loading...</TableCell>
            </TableRow>
        );
    }

    const handleClick = () => {
        setSelectedSatellite(satName);
        router.push(`/satellites/${slug}`);
    };

    return (
        <TableRow
            onClick={handleClick}
            className="cursor-pointer hover:bg-white hover:text-black"
        >
            <TableCell className="w-1/5 px-6">{satName}</TableCell>
            <TableCell className=" w-1/5">{satelliteInfo.velocity}</TableCell>
            <TableCell className=" w-1/5">{satelliteInfo.altitude}</TableCell>
            <TableCell className=" w-1/5">
                {satelliteInfo.latitudeDeg}
            </TableCell>
            <TableCell className="w-1/5">
                {satelliteInfo.longitudeDeg}
            </TableCell>
        </TableRow>
    );
}
