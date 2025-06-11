"use client";
import React, { useEffect, useState } from "react";
import { useLocationStore } from "@/lib/store";
import { useSatelliteStore } from "@/lib/store";
import { convertSatrec, predictFuturePositions } from "@/lib/convertSatrec";
import { time } from "console";
import { cp } from "fs";
import next from "next";
const updateInterval = 50; // in ms
const deltaDegree = 1; // Delta degree to check if the satellite is over the location

export default function SatellitePassOverTime() {
    //Computation of the time before the satellite pass over the selected location
    const selectedLocation = useLocationStore(
        (state) => state.selectedLocation,
    );
    const selectedSatellite = useSatelliteStore(
        (state) => state.selectedSatellite,
    );
    const setSelectedLocation = useLocationStore(
        (state) => state.setSelectedLocation,
    );

    const [point, setPoint] = useState<
        | {
              latitudeDeg: string;
              longitudeDeg: string;
              time: number;
          }
        | undefined
    >(undefined);
    // State to manage the display time

    const [displayTime, setDisplayTime] = useState<string[]>([
        "Calculating...",
    ]);
    const [nextPassTime, setNextPassTime] = useState<number | undefined>(
        undefined,
    );
    const satNumToEntry = useSatelliteStore((state) => state.satNumToEntry);

    useEffect(() => {
        if (!selectedLocation || !selectedSatellite) return;
        const satData = satNumToEntry[selectedSatellite];

        if (satData && satData.satrec) {
            const futurePoints = predictFuturePositions(satData.satrec, 10000);
            const nextPass = futurePoints.find(
                (point) =>
                    Math.abs(
                        selectedLocation.latitude -
                            parseFloat(point.latitudeDeg),
                    ) <= deltaDegree &&
                    Math.abs(
                        selectedLocation.longitude -
                            parseFloat(point.longitudeDeg),
                    ) <= deltaDegree,
            );
            if (nextPass) {
                setNextPassTime(nextPass?.time);
            } else {
                setNextPassTime(undefined);
            }
        }
    }, [selectedSatellite, selectedLocation, satNumToEntry]);

    useEffect(() => {
        if (!nextPassTime) return;
        const intervalId = setInterval(() => {
            const diff = nextPassTime - Date.now();
            if (diff <= 0) {
                setDisplayTime(["Calculating..."]);
            }
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            let timeParts = [];
            if (days > 0) timeParts.push(`${days} days`);
            if (hours > 0 || timeParts.length > 0)
                timeParts.push(`${hours} hours`);
            if (minutes > 0 || timeParts.length > 0)
                timeParts.push(`${minutes} minutes`);
            timeParts.push(`${seconds} seconds`);
            // Set the display time
            setDisplayTime(timeParts);
        }, updateInterval);
        return () => clearInterval(intervalId);
        // Update the display time every `updateInterval` ms
    }, [nextPassTime]);
    return (
        <div className="border  border-l-0 border-r-0 border-gray-600 bg-black p-5">
            {displayTime.map((part, index) => (
                <div key={index} className="mr-2 inline-block">
                    <p>{part}</p>
                </div>
            ))}

            <p className="text-gray-400">
                Time before the satellite passes over the selected location,
                with precision of {deltaDegree}°.
            </p>
        </div>
    );
}
