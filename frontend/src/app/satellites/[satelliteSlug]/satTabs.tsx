"use client";
import React, { useEffect, useState } from "react";
import SatelliteDataHome from "@/components/satelliteData/SatelliteDataHome";
import { SatelliteNumber } from "@/lib/store";
import { SatAttributes } from "@/lib/utils";
import { useTabContext } from "../tabContext";
import SatImage from "./satImage";
import Render3DMod from "../render3DMod";
import Image from "next/image";
import dynamic from "next/dynamic";

const SatTelemetry = dynamic(() => import("./satTelemetry"), {
    ssr: false,
});

export default function SatTabs({
    satAttributes,
    STRAPI_URL,
    BACKEND_INTERNAL_URL,
}: {
    satAttributes: SatAttributes;
    STRAPI_URL: string | undefined;
    BACKEND_INTERNAL_URL: string | undefined;
}) {
    let noradId = Number(satAttributes?.catalogNumberNORAD) as SatelliteNumber;
    const [imageURL, setImageURL] = useState<string | undefined>(undefined);
    const [is3DModel, setIs3DModel] = useState<boolean>(false);
    useEffect(() => {
        let satelliteImage =
            satAttributes?.satelliteImage?.data?.attributes?.url;
        if (BACKEND_INTERNAL_URL && satelliteImage) {
            const fullImage = BACKEND_INTERNAL_URL + satelliteImage;
            setImageURL(fullImage);
            setIs3DModel(
                satelliteImage.endsWith(".glb") ||
                    satelliteImage.endsWith(".gltf") ||
                    satelliteImage.endsWith(".glb?"),
            );
        }
    }, [satAttributes, BACKEND_INTERNAL_URL]);
    const { selectedTab } = useTabContext();
    return (
        <div className="flex w-full flex-col border-2 border-gray-600 xl:flex-row">
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
                ) : selectedTab === "satellite image" ? (
                    <SatImage STRAPI_URL={STRAPI_URL} noradID={noradId} />
                ) : selectedTab === "satellite telemetry" ? (
                    <SatTelemetry STRAPI_URL={STRAPI_URL} noradID={noradId} />
                ) : null}
            </div>
            {/* Image container */}
            {imageURL && selectedTab !== "satellite telemetry" ? (
                <div className="w-full border-t-2 border-gray-600 xl:border-t-0">
                    <div className="flex h-full w-full items-center justify-center bg-black">
                        {is3DModel ? (
                            <Render3DMod url={imageURL} />
                        ) : (
                            <Image
                                src={imageURL}
                                alt={satAttributes?.name ?? ""}
                                width={1600} // Set according to the aspect ratio of the image
                                height={0}
                                className="p-2"
                            />
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
}
