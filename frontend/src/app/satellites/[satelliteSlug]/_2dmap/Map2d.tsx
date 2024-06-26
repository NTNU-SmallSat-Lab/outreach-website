"use client";
import Map2dNaturalProjection from "./2dMapProjection";
import { SatelliteNumber, useSatelliteStore } from "@/lib/store";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
    SatelliteInfo,
    convertSatrec,
    predictFuturePositions,
} from "@/lib/convertSatrec";

const updateInterval = 100;

export default function Map2d({ satNum }: { satNum: SatelliteNumber }) {
    const { satNumToEntry } = useSatelliteStore();
    const [satelliteInfo, setSatelliteInfo] = useState<SatelliteInfo | null>(
        null,
    );
    const [futurePositions, setFuturePositions] = useState<[number, number][]>(
        [],
    );
    const [projectionAmount, setProjectionAmount] = useState(120);
    const [inputValue, setInputValue] = useState(120);
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    // Update satellite info every `updateInterval` ms
    useEffect(() => {
        const intervalId = setInterval(() => {
            // Access satellite data by name
            const satData = satNumToEntry[satNum];
            if (satData && satData.satrec) {
                const updatedInfo = convertSatrec(satData.satrec, satData.name);
                setSatelliteInfo(updatedInfo);
            }
        }, updateInterval);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [satNumToEntry, satNum]);

    // Calculate and update size based on the container's width
    useLayoutEffect(() => {
        function updateSize() {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                const height = width / 2;
                setSize({ width, height });
            }
        }

        window.addEventListener("resize", updateSize);
        updateSize();

        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const satLatitude = satelliteInfo
        ? parseFloat(satelliteInfo.latitudeDeg)
        : undefined;
    const satLongitude = satelliteInfo
        ? parseFloat(satelliteInfo.longitudeDeg)
        : undefined;

    // Get future satellite positions on component mount
    useEffect(() => {
        if (!satNumToEntry[satNum] || !satNumToEntry[satNum].satrec) return;

        const predictions = predictFuturePositions(
            satNumToEntry[satNum]?.satrec,
            projectionAmount,
        );
        const futurePosTuples: [number, number][] = predictions.map(
            (prediction) => [
                parseFloat(prediction.longitudeDeg),
                parseFloat(prediction.latitudeDeg),
            ],
        ) as [number, number][];

        setFuturePositions(futurePosTuples);
    }, [satNum, projectionAmount, satNumToEntry]);

    // Function to handle projection amount change
    const handleSliderChange = (event: { target: { value: any } }) => {
        const value = event.target.value;
        // Update the inputValue state
        setInputValue(value);

        const newAmount = parseInt(value, 10);
        if (!isNaN(newAmount)) {
            // Update the projectionAmount only when newAmount is a number
            setProjectionAmount(newAmount);
        }
    };

    return (
        <div ref={containerRef} className="w-full">
            <div className="flex flex-col items-center justify-between bg-black px-6 py-4 md:flex-row">
                <h1 className="text-center text-lg font-semibold text-white md:text-left">
                    Satellite Position
                </h1>
                <div className="flex flex-col items-end">
                    <input
                        type="range"
                        min="0"
                        max="1440"
                        step="60"
                        value={inputValue}
                        onChange={handleSliderChange}
                        className="w-full rounded-lg bg-gray-200 py-2 text-black focus:outline-none focus:ring"
                    />
                    <p className="mt-2 font-thin">
                        Projected positions {projectionAmount / 60} hours into
                        the {projectionAmount >= 0 ? "future" : "past"}
                    </p>
                </div>
            </div>
            <Map2dNaturalProjection
                width={size.width}
                height={size.height}
                satLatitude={satLatitude}
                satLongitude={satLongitude}
                futurePositions={futurePositions}
            />
        </div>
    );
}
