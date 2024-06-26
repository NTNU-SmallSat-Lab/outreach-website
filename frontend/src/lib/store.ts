// A zustand store for satellite data
// https://github.com/pmndrs/zustand

import { SatRec } from "satellite.js";
import { create } from "zustand";

// Define nominal types for satellite name and number
// Nominal types are used to create a new type that is distinct from an existing type
// This is useful for type safety and to prevent bugs
// For more information on nominal types, see the following blog post or github issue:
//https://dnlytras.com/blog/nominal-types or https://github.com/Microsoft/Typescript/issues/202

declare const __nominal__type: unique symbol;
type Nominal<Type, Identifier> = Type & {
    readonly [__nominal__type]: Identifier;
};

export type SatelliteName = Nominal<string, "SatelliteName">;
export type SatelliteNumber = Nominal<number, "SatelliteNumber">;

// Satellite entry for setSatellites
export interface SatelliteEntry {
    name: SatelliteName;
    num: SatelliteNumber;
    satrec: SatRec;
    timestamp: Date;
}

// Define the state
export interface SatelliteState {
    selectedSatellite: SatelliteNumber | undefined;
    satNumToEntry: Record<SatelliteNumber, SatelliteEntry>;
}

// Disable unused variables as the store actions defined here are used in other files,
/* eslint-disable no-unused-vars */
// Define the actions
export interface SatelliteActions {
    setSelectedSatellite: (SatId: SatelliteNumber) => void;
    setSatellites: (satellites: SatelliteEntry[]) => void;
}
/* eslint-enable no-unused-vars */

type SatelliteStore = SatelliteState & SatelliteActions;

// Create satellite store
export const useSatelliteStore = create<SatelliteStore>()((set) => ({
    selectedSatellite: undefined,
    satNumToEntry: {},

    // Set the satellite names and id mapping, and selected satellite
    setSatellites: (satellites) => {
        set((state) => {
            const selectedSatellite =
                state.selectedSatellite || satellites.length > 0
                    ? satellites[0].num
                    : undefined;

            const satNumToEntry = satellites.reduce<
                Record<SatelliteNumber, SatelliteEntry>
            >(
                (previous, entry) => {
                    previous[entry.num] = entry;
                    return previous;
                },
                { ...state.satNumToEntry },
            );

            return {
                selectedSatellite: selectedSatellite,
                satNumToEntry: satNumToEntry,
            };
        });
    },

    // Set the selected satellite
    setSelectedSatellite: (satNum: SatelliteNumber) => {
        set(() => ({
            selectedSatellite: satNum,
        }));
    },
}));
