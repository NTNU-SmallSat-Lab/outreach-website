/* eslint-disable no-unused-vars */
import { create } from "zustand";
import type { SatelliteData } from "@/lib/getSatelliteData";
import { satLoaderById } from "@/lib/getSatelliteData";

// Satellite entry for setSatellites
interface SatelliteEntry {
    name: string;
    id: string;
}

// Define the state and actions separately
interface SatelliteState {
    satelliteData: Record<string, SatelliteData>;
    satelliteNameToId: Record<string, string>;
    satelliteNames: string[];
    selectedSatellite: string;
}

interface SatelliteActions {
    setSatelliteData: (satName: string, data: SatelliteData) => void;
    fetchAndSetSatelliteData: (satName: string) => Promise<void>;
    setSelectedSatellite: (satName: string) => void;
    setSatellites: (satellites: SatelliteEntry[]) => void;
}

type SatelliteStore = SatelliteState & SatelliteActions;

// Create satellite store
export const useSatelliteStore = create<SatelliteStore>((set, get) => ({
    satelliteData: {},
    satelliteNames: [],
    satelliteNameToId: {},
    selectedSatellite: "",

    fetchAndSetSatelliteData: async (satName) => {
        const satId = get().satelliteNameToId[satName];
        const newData = await satLoaderById(satId);
        set((state) => ({
            satelliteData: { ...state.satelliteData, [satName]: newData },
        }));
    },

    setSatelliteData: (satName, data) => {
        set((state) => ({
            satelliteData: { ...state.satelliteData, [satName]: data },
        }));
    },

    setSelectedSatellite: (satName) => {
        set(() => ({
            selectedSatellite: satName,
        }));
    },

    setSatellites: (satellites) => {
        const names = satellites.map((sat) => sat.name);
        const nameToId = satellites.reduce<Record<string, string>>(
            (acc, sat) => {
                acc[sat.name] = sat.id;
                return acc;
            },
            {},
        );

        set(() => ({
            satelliteNames: names,
            satelliteNameToId: nameToId,
            selectedSatellite: names[0] || "",
        }));
    },
}));
