// Ensure all necessary imports are present
"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Combobox } from "../Combobox"; // Adjust the path as necessary
import {
    mapRawDataToTleData,
    mapTleToSatData,
    SatelliteData,
} from "@/lib/mapHelpers";
import { convertSatrec, SatelliteInfo } from "@/lib/convertSatrec";
import Map2d from "../2dmap/Map2d";

// Define the MyGlobe component with dynamic import
const MyGlobe = dynamic(() => import("@/components/map/MyGlobe"), {
    ssr: false,
});
const updateInterval = 10;

interface ClientOnlyComponentProps {
    fetchSatelliteData: ({
        // eslint-disable-next-line no-unused-vars
        useExampleData,
    }: {
        useExampleData: boolean;
        filterList?: string[];
    }) => Promise<string>;
}

const SatelliteDataTableMultiple: React.FC<ClientOnlyComponentProps> = ({
    fetchSatelliteData,
}) => {
    const [satelliteData, setSatelliteData] = useState<SatelliteData[]>([]);
    const [selectedSatellite, setSelectedSatellite] = useState<
        SatelliteData | undefined
    >();
    const [satelliteInfo, setSatelliteInfo] = useState<SatelliteInfo | null>(
        null,
    );

    // Fetch satellite data on component mount
    useEffect(() => {
        const fetchData = async () => {
            const rawData = await fetchSatelliteData({ useExampleData: true });

            const tleData = mapRawDataToTleData(rawData);

            const mappedData = mapTleToSatData(tleData).slice(0, 10);
            setSatelliteData(mappedData);
            if (mappedData.length > 0) {
                updateSatelliteInfo(mappedData[0]);
                setSelectedSatellite(mappedData[0]); // Ensure the first satellite is selected by default
            }
        };

        fetchData();
    }, [fetchSatelliteData]);

    // Function to update satellite info based on selected satellite
    const updateSatelliteInfo = (satellite: SatelliteData) => {
        const sat = satelliteData.find((s) => s.name === satellite.name);
        if (sat) {
            const info = convertSatrec(sat.satrec, sat.name);
            setSatelliteInfo(info);
        }
    };

    // Handle satellite selection from Combobox
    const handleSelectSatellite = (value: SatelliteData) => {
        setSelectedSatellite(value);
        updateSatelliteInfo(value);
    };

    // Map satellite data for Combobox options

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Access satellite data by name
            if (selectedSatellite) {
                const updatedInfo = convertSatrec(
                    selectedSatellite.satrec,
                    selectedSatellite.name,
                );
                setSatelliteInfo(updatedInfo);
            }
        }, updateInterval);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [selectedSatellite]);

    return satelliteData.length > 0 && selectedSatellite && satelliteInfo ? (
        <>
            <div className="m-5 rounded-lg bg-gray-800 p-6 text-white shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                    <Combobox
                        data={satelliteData}
                        onSelect={handleSelectSatellite}
                    />
                    <div>{/* Include the dropdown arrow icon here */}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="rounded bg-gray-700 p-4">
                        <p className="text-xl">{satelliteInfo.velocity} km/s</p>
                        <p className="text-gray-400">Velocity</p>
                    </div>
                    <div className="rounded bg-gray-700 p-4">
                        <p className="text-xl">{satelliteInfo.altitude} km</p>
                        <p className="text-gray-400">Altitude</p>
                    </div>
                    <div className="rounded bg-gray-700 p-4">
                        <p className="text-xl">
                            {satelliteInfo.latitudeDeg}° N
                        </p>
                        <p className="text-gray-400">Latitude</p>
                    </div>
                    <div className="ounded bg-gray-700 p-4">
                        <p className="text-xl">
                            {satelliteInfo.longitudeDeg}° E
                        </p>
                        <p className="text-gray-400">Longitude</p>
                    </div>
                </div>

                <div className="mt-4 rounded bg-gray-700 p-4">
                    <p className="text-xl">Above {satelliteInfo.country}</p>
                </div>
                <div className="ml-4">{/* Include the flag icon here */}</div>
            </div>
            <MyGlobe
                satelliteDatas={satelliteData}
                selectedSatellite={selectedSatellite}
            />
            <Map2d satName={selectedSatellite.name}/>
        </>
    ) : (
        <div>Loading...</div>
    );
};

export default SatelliteDataTableMultiple;
