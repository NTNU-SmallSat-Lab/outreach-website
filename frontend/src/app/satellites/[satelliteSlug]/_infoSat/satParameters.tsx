import React from "react";
import SatelliteDataHome from "@/components/satelliteData/SatelliteDataHome";
import { SatelliteNumber } from "@/lib/store";

/**
 * This component renders the satellite parameters, including NORAD ID and mass.
 */
export default function SatParameters({
    satAttributes,
    noradId,
}: {
    satAttributes: any | undefined;
    noradId: number | undefined;
}) {
    return (
        <div className="z-10 flex w-full flex-col border-gray-600 xl:border-r-2">
            <div className="border-b border-gray-600 bg-black p-5">
                <div className="flex flex-row">
                    <p>NORAD ID: </p>
                    {noradId ? (
                        <a
                            href={`https://www.n2yo.com/satellite/?s=${noradId}`}
                            target="_blank"
                            className="ml-2 underline"
                        >
                            {noradId}
                        </a>
                    ) : (
                        <span className="ml-2">
                            No NORAD ID has been assigned yet{" "}
                        </span>
                    )}
                </div>

                <p className="text-gray-400">
                    {satAttributes?.massKg
                        ? "Mass: " + satAttributes?.massKg + " kg"
                        : null}
                </p>
            </div>
            {satAttributes?.missionStatus === "IN ORBIT" ? (
                <div>
                    <SatelliteDataHome
                        satelliteNum={noradId as SatelliteNumber}
                    />
                </div>
            ) : null}
        </div>
    );
}
