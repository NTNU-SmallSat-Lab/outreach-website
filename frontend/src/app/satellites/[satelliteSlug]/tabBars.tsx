"use client";
import React from "react";
import { useTabContext } from "@/app/satellites/tabContext";

export default function TabBar({}: {}) {
    const { selectedTab, setSelectedTab } = useTabContext();
    return (
        <div className="flex items-stretch justify-center  ">
            <button
                className={`flex w-full items-center justify-center border-b-2 ${
                    selectedTab === "sat parameters"
                        ? "border-blue-500"
                        : "border-gray-600"
                } bg-black p-5 text-white hover:bg-gray-700`}
                onClick={() => setSelectedTab("sat parameters")}
            >
                <span className="text-lg">Satellite Parameters</span>
            </button>
            <button
                className={`flex w-full items-center justify-center border-b-2 ${
                    selectedTab === "satellite image"
                        ? "border-blue-500"
                        : "border-gray-600"
                } bg-black p-5 text-white hover:bg-gray-700`}
                onClick={() => setSelectedTab("satellite image")}
            >
                <span className="text-lg">Satellite Last Image</span>
            </button>
            <button
                className={`flex w-full items-center justify-center border-b-2 ${
                    selectedTab === "satellite telemetry"
                        ? "border-blue-500"
                        : "border-gray-600"
                } bg-black p-5 text-white hover:bg-gray-700`}
                onClick={() => setSelectedTab("satellite telemetry")}
            >
                <span className="text-lg">Satellite Telemetry</span>
            </button>
        </div>
    );
}
