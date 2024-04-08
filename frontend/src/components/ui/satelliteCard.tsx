"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SatelliteStatsTable from "@/components/satelliteData/SatelliteStatsTable";
// Import OuiImage or your placeholder image component here
import { OuiImage } from "@/components/fullBlogCard";
import { useSatelliteStore } from "@/lib/store";

interface SatelliteCardProps {
    satelliteName: string;
    missionStatus: string;
    previewImage?: string; // Optional
}

const SatelliteCard: React.FC<SatelliteCardProps> = ({
    satelliteName,
    missionStatus,
    previewImage,
}) => {
    const setSelectedSatellite = useSatelliteStore(
        (state) => state.setSelectedSatellite,
    );

    const handleSatelliteCardClick = (satelliteName: string) => () => {
        setSelectedSatellite(satelliteName);
        window.location.href = `/satellites/${encodeURIComponent(satelliteName)}`;
    };

    return (
        <div
            onClick={handleSatelliteCardClick(satelliteName)}
            className="w-1/1.5 m-1 transition-transform duration-300 ease-in-out hover:scale-110 hover:transform sm:m-4 md:w-1/3"
        >
            {" "}
            {/* Ensure the link is clickable and accessible */}
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
                            alt={satelliteName}
                            width={200}
                            height={200}
                            className="margin p-2"
                        />
                    ) : (
                        <div className="m-0 flex aspect-video max-h-full max-w-full items-center justify-center object-contain">
                            <OuiImage />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default SatelliteCard;
