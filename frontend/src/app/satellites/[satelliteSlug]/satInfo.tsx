"use client";
import React from "react";
import SatTabs from "./satTabs";
import { SatAttributes } from "@/lib/utils";
import TabBar from "./tabBars";
import { TabProvider } from "../tabContext";

export default function SatInfo({
    satAttributes,
    STRAPI_URL,
    BACKEND_INTERNAL_URL,
}: {
    satAttributes: SatAttributes;
    STRAPI_URL: string | undefined;
    BACKEND_INTERNAL_URL: string | undefined;
}) {
    return (
        <>
            {" "}
            <TabProvider>
                {satAttributes.missionStatus === "IN ORBIT" ? (
                    <div className="flex w-full ">
                        <TabBar />
                    </div>
                ) : null}
                {/* Container for satname, stats and sat image */}
                <div className="flex w-full flex-col border-2 border-gray-600 xl:flex-row">
                    {/* Stats Container */}
                    <SatTabs
                        satAttributes={satAttributes}
                        STRAPI_URL={STRAPI_URL}
                        BACKEND_INTERNAL_URL={BACKEND_INTERNAL_URL}
                    />
                </div>
            </TabProvider>
        </>
    );
}
