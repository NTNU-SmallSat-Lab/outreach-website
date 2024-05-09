"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { satLoaderById } from "@/lib/getSatelliteData";
import { SatelliteNumber } from "@/lib/store";
import { useSatelliteStore } from "@/lib/store";

/**
 * Renders a dropdown menu to select a satellite.
 * Allows the user to select a satellite by NORAD ID or from a list of satellites.
 */
export default function SatDropdown() {
    const selectedSatellite = useSatelliteStore(
        (state) => state.selectedSatellite,
    );
    const setSelectedSatellite = useSatelliteStore(
        (state) => state.setSelectedSatellite,
    );
    const setSatellites = useSatelliteStore((state) => state.setSatellites);
    const satNumToEntry = useSatelliteStore((state) => state.satNumToEntry);
    let selectedSatelliteName = undefined;
    if (selectedSatellite) {
        selectedSatelliteName = satNumToEntry[selectedSatellite]?.name;
    }

    let isLargeScreen = useRef<boolean>(false);

    // Useeffect to check window type
    useEffect(() => {
        if (typeof window !== "undefined") {
            isLargeScreen.current =
                window.matchMedia("(min-width: 768px)").matches;
        }
    }, []);

    const [isOpen, setIsOpen] = useState<boolean>(isLargeScreen.current);
    const [noradID, setNoradID] = useState<SatelliteNumber>();
    const [error, setError] = useState("");

    const toggleDropdown = () => {
        setError("");
        setIsOpen(!isOpen);
    };

    const handleSelect = (satellite: SatelliteNumber) => {
        setSelectedSatellite(satellite);
    };

    const handleAddSatellite = async (noradID: SatelliteNumber) => {
        if (!noradID) {
            setError("Please enter a valid NORAD ID.");
            return;
        }

        try {
            const data = await satLoaderById(noradID);
            if (data) {
                const newSatellite = {
                    name: data.name,
                    num: noradID,
                    satrec: data.satrec,
                    timestamp: data.timestamp,
                };
                setSatellites([newSatellite]);
                setSelectedSatellite(newSatellite.num);
                setError("");
            } else {
                throw new Error("No data returned for the provided NORAD ID.");
            }
        } catch (e) {
            console.error(
                "Failed to fetch satellite data for NORAD ID:",
                noradID,
                "\n",
                (e as Error).message,
            );
            if (
                (e as Error).message ===
                "403 - Forbidden: Access is denied. You are likely IP banned temporarily for making too many requests."
            ) {
                setError(
                    "403 - Forbidden: Access is denied. You are likely IP banned temporarily for making too many requests.",
                );
                return;
            } else {
                setError(`Satellite with NORAD ID ${noradID} does not exist.`);
            }
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (noradID) {
                handleAddSatellite(noradID);
            }
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // Allow only numeric input
        if (/^\d*$/.test(value)) {
            setNoradID(Number(value) as SatelliteNumber);
        }
    };

    const variants = {
        open: { opacity: 1, height: "auto", maxHeight: "250px" },
        collapsed: { opacity: 0, height: 0 },
    };

    return (
        <div className="w-full">
            <button
                className="flex w-full cursor-pointer flex-row  justify-between bg-black p-4 text-left"
                onClick={toggleDropdown}
            >
                <div className="flex flex-col">
                    <div>{selectedSatelliteName || "Select a Satellite"}</div>
                    <p className="text-gray-400">
                        {selectedSatelliteName ? "Selected Satellite" : null}
                    </p>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 24 24"
                    className="self-center justify-self-center"
                >
                    <path fill="currentColor" d="m7 10l5 5l5-5z" />
                </svg>
            </button>

            {isOpen && <hr />}
            <motion.div
                className={cn("overflow-hidden", isOpen && "overflow-y-scroll")}
                initial="collapsed"
                animate={isOpen ? "open" : "collapsed"}
                variants={variants}
                transition={{ duration: 0.5 }}
            >
                {Object.entries(satNumToEntry).map(([num]) => {
                    let satNum = Number(num) as SatelliteNumber;
                    return (
                        <div
                            key={num}
                            className={cn(
                                "cursor-pointer p-2 text-white hover:bg-gray-700",
                                satNum === selectedSatellite && "bg-gray-800",
                            )}
                            onClick={() =>
                                handleSelect(Number(num) as SatelliteNumber)
                            }
                        >
                            {satNumToEntry[satNum].name}
                        </div>
                    );
                })}
                <div className="mb-2 flex w-full items-center gap-4">
                    <div className="flex flex-grow items-center rounded bg-black text-white">
                        <span className="p-2 pr-0">
                            <svg
                                className="h-4 w-4 text-gray-400"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </span>
                        <input
                            type="text"
                            value={noradID}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className="flex-grow bg-black p-2 text-white outline-none"
                            placeholder="NORAD ID"
                        />
                    </div>
                    <button
                        onClick={() => {
                            if (noradID) {
                                handleAddSatellite(noradID);
                            }
                        }}
                        className="mr-2 whitespace-nowrap rounded-md border bg-primary p-1 text-white duration-200 ease-in-out hover:opacity-80"
                    >
                        Add Satellite
                    </button>
                </div>

                {error && <div className="p-2 pt-0 text-red-500">{error}</div>}
            </motion.div>
        </div>
    );
}
