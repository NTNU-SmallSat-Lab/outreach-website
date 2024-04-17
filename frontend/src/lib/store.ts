/* eslint-disable no-unused-vars */
import { create } from "zustand";
import type { SatelliteData } from "@/lib/getSatelliteData";
import { satLoaderById } from "@/lib/getSatelliteData";

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
}

type SatelliteStore = SatelliteState & SatelliteActions;

// Create satellite store. Update selectedSatellite if you want a different default
export const useSatelliteStore = create<SatelliteStore>((set, get) => ({
    satelliteData: {},
    satelliteNames: ["0 VANGUARD 2", "0 EXPLORER 7"],
    selectedSatellite: "0 VANGUARD 2",
    satelliteNameToId: { "0 VANGUARD 2": "51", "0 EXPLORER 7": "53" },

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
}));
