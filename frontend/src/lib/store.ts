/* eslint-disable no-unused-vars */
import { create } from "zustand";
import type { SatelliteData } from "@/lib/getSatelliteData";

type SatelliteName = string;
type SatelliteId = number;

// Satellite entry for setSatellites
interface SatelliteEntry {
    name: SatelliteName;
    id: SatelliteId;
    data?: SatelliteData;
}

// Define the state
interface SatelliteState {
    SatelliteNameToData: Record<SatelliteName, SatelliteData>;
    satelliteNameToId: Record<SatelliteName, SatelliteId>;
    satelliteNames: SatelliteName[];
    selectedSatellite: SatelliteId | undefined;
}

// Define the actions
interface SatelliteActions {
    setSatelliteData: (satName: SatelliteName, data: SatelliteData) => void;
    setSelectedSatellite: (SatId: SatelliteId) => void;
    setSatellites: (satellites: SatelliteEntry[]) => void;
}

type SatelliteStore = SatelliteState & SatelliteActions;

// Create satellite store
export const useSatelliteStore = create<SatelliteStore>((set) => ({
    SatelliteNameToData: {},
    satelliteNames: [],
    satelliteNameToId: {},
    selectedSatellite: undefined,

    // Set the satellite names and id mapping, and selected satellite
    setSatellites: (satellites) => {
        set((state) => {
            const newNames = satellites.map((sat) => sat.name);
            const newNameToId = satellites.reduce<
                Record<SatelliteName, SatelliteId>
            >((acc, sat) => {
                acc[sat.name] = sat.id;
                return acc;
            }, {});

            const newSatelliteData = satellites.reduce<
                Record<SatelliteName, SatelliteData>
            >(
                (acc, sat) => {
                    if (sat.data) {
                        acc[sat.name] = sat.data;
                    }
                    return acc;
                },
                { ...state.SatelliteNameToData },
            );

            const mergedNames = Array.from(
                new Set([...state.satelliteNames, ...newNames]),
            );
            const mergedNameToId = {
                ...state.satelliteNameToId,
                ...newNameToId,
            };
            const selectedSatellite =
                state.selectedSatellite || satellites[0].id;

            return {
                satelliteNames: mergedNames,
                satelliteNameToId: mergedNameToId,
                SatelliteNameToData: newSatelliteData,
                selectedSatellite: selectedSatellite,
            };
        });
    },

    // Set the satellite data for a specific satellite
    setSatelliteData: (satName: SatelliteName, data: SatelliteData) => {
        set((state) => ({
            SatelliteNameToData: {
                ...state.SatelliteNameToData,
                [satName]: data,
            },
        }));
    },

    // Set the selected satellite
    setSelectedSatellite: (satName) => {
        set(() => ({
            selectedSatellite: satName,
        }));
    },
}));
