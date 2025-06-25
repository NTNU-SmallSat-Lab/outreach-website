"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Render3DMod from "../render3DMod";
import SatTabs from "./satTabs";
import { SatAttributes } from "@/lib/utils";
import TabBar from "./tabBars";
import { TabProvider } from "../tabContext";

export default function SatInfo({
    satAttributes,
    STRAPI_URL,
}: {
    satAttributes: SatAttributes;
    STRAPI_URL: string | undefined;
}) {
    const [selectedTab, setSelectedTab] = useState<
        "sat parameters" | "satellite image" | "satellite telemetry"
    >("sat parameters");
    const [imageURL, setImageURL] = useState<string | undefined>(undefined);
    const [is3DModel, setIs3DModel] = useState<boolean>(false);
    useEffect(() => {
        let satelliteImage =
            satAttributes?.satelliteImage?.data?.attributes?.url;
        if (STRAPI_URL && satelliteImage) {
            const fullImage = STRAPI_URL + satelliteImage;
            setImageURL(fullImage);
            setIs3DModel(
                satelliteImage.endsWith(".glb") ||
                    satelliteImage.endsWith(".gltf") ||
                    satelliteImage.endsWith(".glb?"),
            );
        }
    }, [satAttributes, STRAPI_URL]);

    const handleTabChange = (
        tab: "sat parameters" | "satellite image" | "satellite telemetry",
    ) => {
        setSelectedTab(tab);
    };

    return (
        <>
            {" "}
            <TabProvider>
                <div className="flex w-full ">
                    <TabBar />
                </div>
                {/* Container for satname, stats and sat image */}
                <div className="flex w-full flex-col border-2 border-gray-600 xl:flex-row">
                    {/* Stats Container */}
                    <SatTabs satAttributes={satAttributes} />

                    {/* Image container */}
                    <div className="w-full border-t-2 border-gray-600 xl:border-t-0">
                        <div className="flex h-full w-full items-center justify-center bg-black">
                            {imageURL ? (
                                is3DModel ? (
                                    <Render3DMod url={imageURL} />
                                ) : (
                                    <Image
                                        src={imageURL}
                                        alt={satAttributes?.name ?? ""}
                                        width={1600} // Set according to the aspect ratio of the image
                                        height={0}
                                        className="p-2"
                                    />
                                )
                            ) : null}
                        </div>
                    </div>
                </div>
            </TabProvider>
        </>
    );
}
