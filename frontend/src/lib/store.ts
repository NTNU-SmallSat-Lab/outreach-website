import { create } from "zustand";
import type { SatelliteData } from "@/lib/getSatelliteData";
import { satLoader } from "@/lib/getSatelliteData";

interface SatelliteStore {
    satelliteData: SatelliteData[];
    setSatelliteData: (data: SatelliteData[]) => void;
    fetchAndSetSatelliteData: (satName: string) => Promise<void>;
}

export const useSatelliteStore = create<SatelliteStore>((set, get) => ({
    satelliteData: [],

    // Action to update satellite data
    setSatelliteData: (data) => set(() => ({ satelliteData: data })),

    // Action to fetch new satellite data and update the state (only fetches new data if the cache is stale)
    // Use this when you want to display the satellite data
    fetchAndSetSatelliteData: async (satName: string) => {
        const newData = await satLoader(satName);
        set(() => ({ satelliteData: newData }));
    },
}));
