"use client";
import React from "react";
import SatDropdown from "./SatDropdown";

/**
 * Renders the SatelliteSelector component.
 * Allows the user to select a satellite to view.
 */
export default function SatelliteSelector() {
    return (
        <div className="m-0 w-full border-b border-gray-600 p-0">
            <SatDropdown />
        </div>
    );
}
