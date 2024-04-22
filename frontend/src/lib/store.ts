/* eslint-disable no-unused-vars */
import { create } from "zustand";
import type { SatelliteData } from "@/lib/getSatelliteData";

// Satellite entry for setSatellites
interface SatelliteEntry {
    name: string;
    id: string;
    data?: SatelliteData;
}

// Define the state
interface SatelliteState {
    satelliteData: Record<string, SatelliteData>;
    satelliteNameToId: Record<string, string>;
    satelliteNames: string[];
    selectedSatellite: string;
}

// Define the actions
interface SatelliteActions {
    setSatelliteData: (satName: string, data: SatelliteData) => void;
    setSelectedSatellite: (satName: string) => void;
    setSatellites: (satellites: SatelliteEntry[]) => void;
}

type SatelliteStore = SatelliteState & SatelliteActions;

// Create satellite store
export const useSatelliteStore = create<SatelliteStore>((set) => ({
    satelliteData: {},
    satelliteNames: [],
    satelliteNameToId: {},
    selectedSatellite: "",

    // Set the satellite names and id mapping, and selected satellite
    setSatellites: (satellites) => {
        set((state) => {
            const newNames = satellites.map((sat) => sat.name);
            const newNameToId = satellites.reduce<Record<string, string>>(
                (acc, sat) => {
                    acc[sat.name] = sat.id;
                    return acc;
                },
                {},
            );

            const newSatelliteData = satellites.reduce<
                Record<string, SatelliteData>
            >(
                (acc, sat) => {
                    if (sat.data) {
                        acc[sat.name] = sat.data;
                    }
                    return acc;
                },
                { ...state.satelliteData },
            );

            const mergedNames = Array.from(
                new Set([...state.satelliteNames, ...newNames]),
            );
            const mergedNameToId = {
                ...state.satelliteNameToId,
                ...newNameToId,
            };
            const selectedSatellite = state.selectedSatellite || newNames[0];

            return {
                satelliteNames: mergedNames,
                satelliteNameToId: mergedNameToId,
                satelliteData: newSatelliteData,
                selectedSatellite: selectedSatellite,
            };
        });
    },

    // Set the satellite data for a specific satellite
    setSatelliteData: (satName, data) => {
        set((state) => ({
            satelliteData: { ...state.satelliteData, [satName]: data },
        }));
    },

    // Set the selected satellite
    setSelectedSatellite: (satName) => {
        set(() => ({
            selectedSatellite: satName,
        }));
    },
}));
