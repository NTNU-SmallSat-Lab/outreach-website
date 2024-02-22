"use client";
import SolarData from "@/components/SolarActivity/SolarData";
import { useEffect, useRef } from "react";
import { Chart } from "chart.js";

export default function Page() {
    return (
        <>
            <h1>Testing solar activity data fetching</h1>
            <SolarData />
            <hr />
            <h1 className="w-[110px] mx-auto mt-10 text-xl font-semibold capitalize ">
                line Chart
            </h1>
            <div className="w-[1100px] h-screen flex mx-auto my-auto">
                <div className="border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl">
                    <canvas id="solarGraph"></canvas>
                </div>
            </div>
        </>
    );
}
