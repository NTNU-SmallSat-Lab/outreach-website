"use client";
import React from "react";
import { useTabContext } from "@/app/satellites/tabContext";

/**
 * This component renders the tab bar for satellite information, allowing users to switch between parameters, image, and telemetry tabs.
 */

export default function TabBar() {
    const { selectedTab, setSelectedTab } = useTabContext();
    return (
        <div
            className="flex items-stretch justify-center"
            data-testid="satellite-tab-bar"
        >
            <button
                className={`flex w-full items-center justify-center border-b-2 ${
                    selectedTab === "sat parameters"
                        ? "border-blue-500"
                        : "border-gray-600"
                } bg-black p-5 text-white hover:bg-gray-700`}
                onClick={() => setSelectedTab("sat parameters")}
                aria-selected={selectedTab === "sat parameters"}
                role="tab"
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
                aria-selected={selectedTab === "satellite image"}
                role="tab"
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
                aria-selected={selectedTab === "satellite telemetry"}
                role="tab"
            >
                <span className="text-lg">Satellite Telemetry</span>
            </button>
        </div>
    );
}
