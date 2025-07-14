"use client";
import React, { useEffect, useState } from "react";
import { SatelliteNumber } from "@/lib/store";
import { SatAttributes } from "@/lib/utils";
import { useTabContext } from "../../tabContext";
import SatImage from "./satImage";
import Render3DMod from "../../render3DMod";
import Image from "next/image";
import dynamic from "next/dynamic";
import SatParameters from "./satParameters";

const SatTelemetry = dynamic(() => import("./satTelemetry"), {
    ssr: false,
});

/* This component renders the tabs for satellite information, including parameters, image, and telemetry.
It uses the `useTabContext` to manage the selected tab and displays the appropriate content based
*/

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
                    <SatParameters
                        satAttributes={satAttributes}
                        noradId={noradId}
                    />
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
