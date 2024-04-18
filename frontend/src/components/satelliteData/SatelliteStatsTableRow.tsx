"use client";
import { useState, useEffect } from "react";
import { convertSatrec, SatelliteInfo } from "@/lib/convertSatrec";
import { useSatelliteStore } from "@/lib/store";
import { TableCell, TableRow } from "@/components/shadcn/table";
import { useRouter } from "next/navigation";

const updateInterval = 10;
interface columnInterface {
    [key: string]: any;
    name: string;
    attributeName: string;
    classNames: string;
}

export default function SatelliteStatsTableRow({
    satName,
    slug,
    columns,
}: {
    satName: string;
    slug: string;
    columns: columnInterface[] | undefined;
}) {
    const { satelliteData, fetchAndSetSatelliteData } = useSatelliteStore();
    const [satelliteInfo, setSatelliteInfo] = useState<SatelliteInfo | null>(
        null,
    );

    const router = useRouter();

    // Fetch satellite data on component mount
    useEffect(() => {
        fetchAndSetSatelliteData(satName);
    }, [fetchAndSetSatelliteData, satName]);

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
            <tr>
                <td className="px-6">
                        Loading...
                </td>
                {columns ? columns.map((column) => (
                    <td className={column.classNames} key={column.name}>
                        Loading...
                    </td>
                )): <></>}
            </tr>
        );
    }

    function handleClick() {
        router.replace(`/satellites/${slug}`);
    }

    return (
        <TableRow
            onClick={handleClick}
            className="cursor-pointer hover:bg-white hover:text-black"
        >

                <TableCell
                    className="px-6"
                    
                >
                    {satName}
                </TableCell>

            {columns ? columns.map((column) => (
                <TableCell
                    className={column.classNames}
                    key={column.attributeName}
                    style={{ width: "20%" }}
                >
                    {satelliteInfo[column.attributeName]}
                </TableCell>
            )): <></>}
        </TableRow>
    );
}
