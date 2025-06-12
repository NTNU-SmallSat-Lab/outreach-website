"use client";
import React, { useState } from "react";
import { SatelliteNumber } from "@/lib/store";
import SatellitePassOverLocation from "./SatellitePassOverLocation";
import SatellitePassOverTime from "./SatellitePassOverTime";
import { Location } from "@/lib/store";

export default function SatellitePassOver() {
    return (
        <div>
            <SatellitePassOverLocation />
            <SatellitePassOverTime />
        </div>
    );
}
