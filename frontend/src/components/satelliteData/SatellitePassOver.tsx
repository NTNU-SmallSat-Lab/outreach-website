"use client";
import React, { useState } from "react";
import { SatelliteNumber } from "@/lib/store";
import SatellitePassOverLocation from "./SatellitePassOverLocation";
import SatellitePassOverTime from "./SatellitePassOverTime";
import { Location } from "@/lib/store";

export default function SatellitePassOver() {
    return (
        <div className="m-0 w-full border-b border-gray-600 p-0">
            <SatellitePassOverLocation />
            <SatellitePassOverTime />
        </div>
    );
}
