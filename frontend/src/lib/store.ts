/* eslint-disable no-unused-vars */
import { create } from "zustand";
import type { SatelliteData } from "@/lib/getSatelliteData";
import { satLoader } from "@/lib/getSatelliteData";

interface SatelliteStore {
    satelliteData: Record<string, SatelliteData>;
    satelliteNames: string[];
    
    setSatelliteData: (satName: string, data: SatelliteData) => void;
    fetchAndSetSatelliteData: (satName: string) => Promise<void>;

    getSatelliteNames: () => void;
}

export const useSatelliteStore = create<SatelliteStore>((set) => ({
    satelliteData: {},
    satelliteNames: [],
    setSatelliteData: (satName, data) =>
        set((state) => ({
            satelliteData: { ...state.satelliteData, [satName]: data },
        })),
    fetchAndSetSatelliteData: async (satName) => {
        // Fetch data with the loader, which should handle caching internally
        const newData = await satLoader(satName);
        set((state) => ({
            satelliteData: { ...state.satelliteData, [satName]: newData },
        }));
    },

    getSatelliteNames: () => {
        
    }
}));
