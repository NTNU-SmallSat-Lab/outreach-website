"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { satLoaderById } from "@/lib/getSatelliteData";

type DropdownProps = {
    satelliteNames: string[];
    selectedSatellite: string;
    setSelectedSatellite: (satellite: string) => void;
    setSatellites: (satellites: any) => void;
};

export default function SatDropdown({
    satelliteNames,
    selectedSatellite,
    setSelectedSatellite,
    setSatellites,
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [noradID, setNoradID] = useState("");
    const [error, setError] = useState("");

    const toggleDropdown = () => {
        setError("");
        setIsOpen(!isOpen);
    };

    const handleSelect = (satellite: string) => {
        setSelectedSatellite(satellite);
        setIsOpen(false);
    };

    const handleAddSatellite = async (noradID: string) => {
        if (!noradID) {
            setError("Please enter a valid NORAD ID.");
            return;
        }

        try {
            const data = await satLoaderById(noradID);
            if (data) {
                const newSatellite = {
                    name: data.name,
                    id: noradID,
                    data: data,
                };
                setSatellites([newSatellite]);
                setSelectedSatellite(newSatellite.name);
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
            handleAddSatellite(noradID);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // Allow only numeric input
        if (/^\d*$/.test(value)) {
            setNoradID(value);
        }
    };

    const variants = {
        open: { opacity: 1, height: "auto", maxHeight: "250px" },
        collapsed: { opacity: 0, height: 0 },
    };

    return (
        <div className="w-full">
            <button
                className="flex w-full cursor-pointer flex-row items-center justify-between bg-black p-4 text-left text-xl font-bold tracking-wide"
                onClick={toggleDropdown}
            >
                {selectedSatellite || "Select a Satellite"}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 24 24"
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
                {satelliteNames.map((satellite) => (
                    <div
                        key={satellite}
                        className="cursor-pointer p-2 text-white hover:bg-gray-700"
                        onClick={() => handleSelect(satellite)}
                    >
                        {satellite !== selectedSatellite
                            ? satellite
                            : `${satellite} (Selected)`}
                    </div>
                ))}
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
                        onClick={() => handleAddSatellite(noradID)}
                        className=" mr-2 whitespace-nowrap rounded border bg-white p-1 text-black transition duration-150 ease-in-out hover:bg-gray-300"
                    >
                        Add Satellite
                    </button>
                </div>

                {error && <div className="p-2 pt-0 text-red-500">{error}</div>}
            </motion.div>
        </div>
    );
}
