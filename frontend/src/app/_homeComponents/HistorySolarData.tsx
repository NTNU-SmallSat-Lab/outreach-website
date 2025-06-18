"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Hero from "./Hero";
import { PagePaddingOnlyHorizontal } from "@/components/layout/PageLayout";

const solarDataUrl =
    "https://services.swpc.noaa.gov/images/swx-overview-large.gif";

export default function HistorySolarData() {
    return (
        <div className="flex w-full flex-col items-center justify-center">
            <div className="mt-16 flex flex-col items-center justify-center text-center">
                <div className="prose prose-invert">
                    <h1>{"Historical Solar Data"}</h1>
                    <p>
                        {
                            "Here is shown multiple charts informing the current state of the solar weather"
                        }
                    </p>
                </div>
            </div>
            {/* Images side by side */}
            <div className="my-10 flex w-full flex-row items-center justify-center gap-8 p-4 text-center">
                <Image
                    alt="Historical Solar Data"
                    src={solarDataUrl}
                    width={900}
                    height={400}
                    className="w-900 h-auto"
                />
            </div>
        </div>
    );
}
