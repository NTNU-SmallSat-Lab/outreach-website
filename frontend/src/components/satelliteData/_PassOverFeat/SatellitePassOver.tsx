"use client";
import SatellitePassOverLocation from "./SatellitePassOverLocation";
import SatellitePassOverTime from "./SatellitePassOverTime";

/**
 * This component renders the satellite pass over feature, including location and time components.
 * It allows users to see when a satellite will pass over a selected location.
 */

export default function SatellitePassOver() {
    return (
        <div>
            <SatellitePassOverLocation />
            <SatellitePassOverTime />
        </div>
    );
}
