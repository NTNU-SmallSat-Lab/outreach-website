"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/shadcn/card";
import SatelliteStatsTable from "@/components/satelliteData/SatelliteStatsTable";
// Import OuiImage or your placeholder image component here
import { OuiImage } from "@/components/fullBlogCard";
//import { useSatelliteStore } from "@/lib/store";

interface SatelliteCardProps {
    satelliteName: string;
    missionStatus: string;
    previewImage?: string; // Optional
    satelliteId: Number;
}

const SatelliteCard: React.FC<SatelliteCardProps> = ({
    satelliteName,
    missionStatus,
    previewImage,
    satelliteId,
}) => {
    /*const setSelectedSatellite = useSatelliteStore(
        (state) => state.setSelectedSatellite,
    );*/

    return (
        <Link
            href={"/satellites/" + satelliteName}
            className="w-1/1.5 transition-transform duration-300 ease-in-out hover:scale-105 hover:transform md:w-1/3"
            key={satelliteId.toString()}
        >
            <Card className="flex h-full w-full flex-col">
                <CardHeader className="flex flex-col items-center justify-center">
                    <CardTitle>{satelliteName}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                    <SatelliteStatsTable
                        satName={satelliteName}
                        missionStatus={missionStatus}
                    />
                    {previewImage ? (
                        <Image
                            src={previewImage}
                            alt={previewImage}
                            width={200}
                            height={0}
                            className="margin p-2"
                        />
                    ) : (
                        <div className="m-0 flex aspect-video max-h-full max-w-full items-center justify-center object-contain">
                            <OuiImage />
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
};

export default SatelliteCard;
