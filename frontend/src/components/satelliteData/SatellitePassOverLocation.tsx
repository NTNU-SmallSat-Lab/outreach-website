"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Location } from "@/lib/store";
import { useLocationStore } from "@/lib/store";

export default function SatellitePassOverLocation() {
    // State to manage whether the dropdown is open or closed
    let isLargeScreen = useRef<boolean>(false);
    // Useeffect to check window type
    useEffect(() => {
        if (typeof window !== "undefined") {
            isLargeScreen.current =
                window.matchMedia("(min-width: 768px)").matches;
        }
    }, []);

    const [isOpen, setIsOpen] = useState<boolean>(isLargeScreen.current);
    const [latitude, setLatitude] = useState<string>("");
    const [longitude, setLongitude] = useState<string>("");
    const [error, setError] = useState<string>("");
    const locations = useLocationStore((state) => state.locations);
    const addLocation = useLocationStore((state) => state.addLocation);
    const setSelectedLocation = useLocationStore(
        (state) => state.setSelectedLocation,
    );
    const selectedLocation = useLocationStore(
        (state) => state.selectedLocation,
    );
    const [displaeydCity, setDisplayedCity] = useState<string>(
        selectedLocation?.name || "",
    );
    const [displayedLocation, setDisplayedLocation] = useState<string>(
        selectedLocation?.latitude.toFixed(2) +
            "° N, " +
            selectedLocation?.longitude.toFixed(2) +
            "° E",
    );

    const toggleDropdown = () => {
        setError("");
        setIsOpen(!isOpen);
    };

    const handleAddLocation = (latitude: string, longitude: string) => {
        //Placeholder for adding a location
        addLocation({
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            name: "",
        });
        setLatitude("");
        setLongitude("");
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleAddLocation(latitude, longitude);
        }
    };
    const handleLatitudeChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const value = event.target.value;
        // Allow only numeric input
        if (/^-?\d*\.?\d*$/.test(value)) {
            setLatitude(value);
        }
    };
    const handleLongitudeChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const value = event.target.value;
        // Allow only numeric input
        if (/^-?\d*\.?\d*$/.test(value)) {
            setLongitude(value);
        }
    };
    const handleSelect = (location: Location) => {
        if (location.name !== "") {
            setDisplayedCity(location.name);
            setDisplayedLocation("");
        } else if (location.latitude && location.longitude) {
            setDisplayedCity("");
            setDisplayedLocation(
                location.latitude.toFixed(2) +
                    "° N, " +
                    location.longitude.toFixed(2) +
                    "° E",
            );
        }
        setSelectedLocation(location);
    };
    const variants = {
        open: { opacity: 1, height: "auto", maxHeight: "250px" },
        collapsed: { opacity: 0, height: 0 },
    };

    return (
        <div className="m-0 w-full border-b border-gray-600 p-0">
            <button
                className="flex w-full cursor-pointer flex-row  justify-between bg-black p-4 text-left"
                onClick={toggleDropdown}
            >
                <div className="flex flex-col">
                    <div>
                        {displaeydCity ||
                            displayedLocation ||
                            "Select a Location"}
                    </div>
                    <p className="text-gray-400">
                        {displaeydCity
                            ? "Selected city"
                            : displayedLocation
                              ? "Selected location"
                              : null}
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
                {locations.map((location, idx) => (
                    <div
                        key={idx}
                        className="cursor-pointer p-2 text-white hover:bg-gray-700"
                        onClick={() => handleSelect(location)}
                    >
                        {location.name} ({location.latitude + "° N"},{" "}
                        {location.longitude + "° E"})
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
                            value={latitude.toString()}
                            onChange={handleLatitudeChange}
                            onKeyDown={handleKeyDown}
                            className="flex-grow bg-black p-2 text-white outline-none"
                            placeholder="latitude"
                        />
                        <input
                            type="text"
                            value={longitude.toString()}
                            onChange={handleLongitudeChange}
                            onKeyDown={handleKeyDown}
                            className="flex-grow bg-black p-2 text-white outline-none"
                            placeholder="longitude"
                        />
                    </div>
                    <button
                        onClick={() => {
                            if (latitude && longitude) {
                                handleAddLocation(latitude, longitude);
                            }
                        }}
                        className="mr-2 whitespace-nowrap rounded-md border bg-primary p-1 text-white duration-200 ease-in-out hover:opacity-80"
                    >
                        Add Location
                    </button>
                </div>

                {error && <div className="p-2 pt-0 text-red-500">{error}</div>}
            </motion.div>
        </div>
    );
}
