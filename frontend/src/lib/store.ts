/* eslint-disable no-unused-vars */
import { create } from "zustand";
import type { SatelliteData } from "@/lib/getSatelliteData";
import { satLoader } from "@/lib/getSatelliteData";

// Define the state and actions separately
interface SatelliteState {
    satelliteData: Record<string, SatelliteData>;
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
    satelliteNames: ["0 VANGUARD 2", "0 EXPLORER 7", "0 SOLRAD 3/INJUN 1", "0 STARLINK-1007"],
    selectedSatellite: "0 VANGUARD 2",

    setSatelliteData: (satName, data) =>
        set((state) => ({
            satelliteData: { ...state.satelliteData, [satName]: data },
        })),
    fetchAndSetSatelliteData: async (satName) => {
        const newData = await satLoader(satName);
        set((state) => ({
            satelliteData: { ...state.satelliteData, [satName]: newData },
        }));
    },

    setSelectedSatellite: (satName) => {
        set(() => ({
            selectedSatellite: satName,
        }));
    },
}));
