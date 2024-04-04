// ClientOnlyComponent.js or .tsx if you're using TypeScript
"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Combobox } from "../Combobox";
import { mapRawDataToTleData, mapTleToSatData } from "@/lib/mapHelpers";
import { SatelliteData } from "@/lib/mapHelpers";
const MyGlobe = dynamic(() => import("@/components/map/MyGlobe"), {
    ssr: false,
});

interface ClientOnlyComponentProps {
    // eslint-disable-next-line no-unused-vars
    fetchSatelliteData: ({
        // eslint-disable-next-line no-unused-vars
        useExampleData,
    }: {
        useExampleData: boolean;
        filterList?: string[];
    }) => Promise<string>;
}

const ClientOnlyComponent: React.FC<ClientOnlyComponentProps> = ({
    fetchSatelliteData,
}) => {
    const [satelliteData, setSatelliteData] = useState<SatelliteData[]>([]);
    const [selectedSatellite, setSelectedSatellite] = useState<
        string | undefined
    >(undefined);

    const onSelectSatellite = (selectedValue: string) => {
        if (selectedValue !== selectedSatellite) {
            setSelectedSatellite(selectedValue);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = mapTleToSatData(
                mapRawDataToTleData(
                    await fetchSatelliteData({ useExampleData: true }),
                ),
            );
            setSatelliteData(data.slice(0, 10));
            if (data.length > 0) {
                setSelectedSatellite(data[0].name);
            }
        };

        fetchData();
    }, [fetchSatelliteData]);

    const frameworkData = satelliteData.map((sat) => ({
        value: sat.name, // Assuming the unique identifier for each satellite is its name
        label: sat.name,
    }));

    return (
        <>
            <div>
                <Combobox
                    data={frameworkData}
                    onSelect={onSelectSatellite}
                ></Combobox>
                <MyGlobe
                    satelliteDatas={satelliteData}
                    selectedSatellite={selectedSatellite}
                />
            </div>
        </>
    );
};

export default ClientOnlyComponent;
