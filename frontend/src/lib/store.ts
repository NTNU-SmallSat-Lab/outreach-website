import create from "zustand";
import type { SatelliteData } from "@/app/loaders/satelliteData";
import { loader } from "@/app/loaders/satelliteData";

interface SatelliteStore {
    satelliteData: SatelliteData[];
    setSatelliteData: (data: SatelliteData[]) => void;
    fetchAndSetSatelliteData: (satName: string) => Promise<void>;
}

export const useSatelliteStore = create<SatelliteStore>((set, get) => ({
    satelliteData: [], // Initial empty array

    // Action to update satellite data
    setSatelliteData: (data) => set(() => ({ satelliteData: data })),

    // Action to fetch new satellite data and update the state
    fetchAndSetSatelliteData: async (satName: string) => {
        const newData = await loader(satName);
        set(() => ({ satelliteData: newData }));
    },
}));
