"use client";
import SatellitePassOverLocation from "./SatellitePassOverLocation";
import SatellitePassOverTime from "./SatellitePassOverTime";

export default function SatellitePassOver() {
    return (
        <div>
            <SatellitePassOverLocation />
            <SatellitePassOverTime />
        </div>
    );
}
