/* eslint-disable no-unused-vars */
import { SatRec } from "satellite.js";
import { create } from "zustand";

export type SatelliteName = string;
export type SatelliteNumber = number;
// Satellite entry for setSatellites
export interface SatelliteEntry {
    name: SatelliteName;
    num: SatelliteNumber;
    satrec: SatRec;
    timestamp: Date;
}

// Define the state
export interface SatelliteState {
    SatelliteNameToEntry: Record<SatelliteName, SatelliteEntry>;
    satelliteNameToNum: Record<SatelliteName, SatelliteNumber>;
    satelliteNames: SatelliteName[];
    selectedSatellite: SatelliteNumber | undefined;
    satNumToEntry: Record<SatelliteNumber, SatelliteEntry>;
}

// Define the actions
export interface SatelliteActions {
    setSatelliteData: (satName: SatelliteName, data: SatelliteEntry) => void;
    setSelectedSatellite: (SatId: SatelliteNumber) => void;
    setSatellites: (satellites: SatelliteEntry[]) => void;
}

type SatelliteStore = SatelliteState & SatelliteActions;

// Create satellite store
export const useSatelliteStore = create<SatelliteStore>((set) => ({
    SatelliteNameToEntry: {},
    satelliteNames: [],
    satelliteNameToNum: {},
    selectedSatellite: undefined,
    satNumToEntry: {},

    // Set the satellite names and id mapping, and selected satellite
    setSatellites: (satellites) => {
        set((state) => {
            const newNames = satellites.map((sat) => sat.name);
            const newNameToId = satellites.reduce<
                Record<SatelliteName, SatelliteNumber>
            >((acc, sat) => {
                acc[sat.name] = sat.num;
                return acc;
            }, {});

            // Create a new SatelliteNameToEntry object
            // Combines the new satellites with the existing ones
            const newSatelliteData = satellites.reduce<
                Record<SatelliteName, SatelliteEntry>
            >(
                (previous, satEntry) => {
                    // If the satrec exists, update the entry
                    if (satEntry.satrec) {
                        previous[satEntry.name] = {
                            ...satEntry,
                            satrec: satEntry.satrec,
                        };
                        // Update the timestamp if it doesn't exist
                        if (!satEntry.timestamp) {
                            previous[satEntry.name].timestamp =
                                satEntry.timestamp;
                        } else {
                            previous[satEntry.name].timestamp = new Date();
                        }
                    }
                    else {
                        previous[satEntry.name] = {
                            ...satEntry,
                            satrec: previous[satEntry.name].satrec,
                        };
                    }
                    return previous;
                },
                { ...state.SatelliteNameToEntry },
            );

            const mergedNames = Array.from(
                new Set([...state.satelliteNames, ...newNames]),
            );
            const mergedNameToId = {
                ...state.satelliteNameToNum,
                ...newNameToId,
            };
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
                satelliteNames: mergedNames,
                satelliteNameToNum: mergedNameToId,
                SatelliteNameToEntry: newSatelliteData,
                selectedSatellite: selectedSatellite,
                satNumToEntry: satNumToEntry,
            };
        });
    },

    // Set the satellite data for a specific satellite
    setSatelliteData: (satName: SatelliteName, data: SatelliteEntry) => {
        set((state) => ({
            SatelliteNameToEntry: {
                ...state.SatelliteNameToEntry,
                [satName]: data,
            },
        }));
    },

    // Set the selected satellite
    setSelectedSatellite: (satNum: SatelliteNumber) => {
        set(() => ({
            selectedSatellite: satNum,
        }));
    },
}));
