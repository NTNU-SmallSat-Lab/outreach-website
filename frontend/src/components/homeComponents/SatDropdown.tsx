import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type DropdownProps = {
    satelliteNames: string[];
    selectedSatellite: string;
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
        open: { opacity: 1, height: "auto", maxHeight: "300px" }, // Ensure maxHeight is a string with units
        collapsed: { opacity: 0, height: 0 },
    };

    return (
        <div className="w-full">
            <button
                className="block w-full cursor-pointer bg-black p-4 text-left text-xl font-bold tracking-wide"
                onClick={toggleDropdown}
            >
                {selectedSatellite || "Select a Satellite"}
            </button>
            {isOpen && <hr />}
            <motion.div
                className={cn("overflow-hidden", isOpen && "overflow-y-scroll")} // Use 'overflow-y-scroll' for vertical scrolling
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
