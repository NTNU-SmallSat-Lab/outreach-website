import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type DropdownProps = {
    satelliteNames: string[];
    selectedSatellite: string;
    // eslint-disable-next-line no-unused-vars
    setSelectedSatellite: (satellite: string) => void;
};

export default function SatDropdown({
    satelliteNames,
    selectedSatellite,
    setSelectedSatellite,
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (satellite: string) => {
        setSelectedSatellite(satellite);
        setIsOpen(false);
    };

    // Animation variants for the dropdown content
    const variants = {
        open: { opacity: 1, height: "auto", maxHeight: "250px" },
        collapsed: { opacity: 0, height: 0 },
    };

    return (
        <div className="w-full">
            <button
                className="flex w-full cursor-pointer flex-col  bg-black p-4 text-left"
                onClick={toggleDropdown}
            >
                <div className="flex flex-row items-center justify-between text-xl font-bold tracking-wide">
                    {selectedSatellite || "Select a Satellite"}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2em"
                        height="2em"
                        viewBox="0 0 24 24"
                    >
                        <path fill="currentColor" d="m7 10l5 5l5-5z" />
                    </svg>
                </div>
                <p className=" text-gray-400">Selected Satellite</p>
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
            </motion.div>
        </div>
    );
}
