import { create } from "zustand";

export type Satellite = {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    altitude: number;
    velocity: number;
    country: string;
};

export type State = {
    Satellites: Satellite[];
};

export type Actions = {
    addSatellite: (satellite: Satellite) => void;
    removeSatellite: (id: string) => void;
    updateSatellite: (id: string, satellite: Partial<Satellite>) => void;
};

export const useSatelliteStore = create<State & Actions>()((set) => ({
    Satellites: [],
    addSatellite: (satellite) =>
        set((state) => ({ Satellites: [...state.Satellites, satellite] })),
    removeSatellite: (id) =>
        set((state) => ({
            Satellites: state.Satellites.filter((s) => s.id !== id),
        })),
    updateSatellite: (id, satellite) =>
        set((state) => ({
            Satellites: state.Satellites.map((s) =>
                s.id === id ? { ...s, ...satellite } : s,
            ),
        })),
}));
