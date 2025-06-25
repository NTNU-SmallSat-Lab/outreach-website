"use client";
import React from "react";
import SatelliteDataHome from "@/components/satelliteData/SatelliteDataHome";
import { SatelliteNumber } from "@/lib/store";
import { SatAttributes } from "@/lib/utils";
import { useTabContext } from "../tabContext";

export default function SatTabs({
    satAttributes,
}: {
    satAttributes: SatAttributes;
}) {
    let noradId = Number(satAttributes?.catalogNumberNORAD) as SatelliteNumber;
    const { selectedTab } = useTabContext();
    return (
        <div className="z-10 flex w-full flex-col border-gray-600 xl:border-r-2">
            {selectedTab === "sat parameters" ? (
                // Render the parameters of the satellite
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
                            <SatelliteDataHome satelliteNum={noradId} />
                        </div>
                    ) : null}
                </div>
            ) : selectedTab === "satellite image" ? null : null}
        </div>
    );
}
