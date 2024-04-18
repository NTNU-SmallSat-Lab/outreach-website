import { twoline2satrec } from "satellite.js";
import { SatRec } from "satellite.js";
import { exampleData } from "@/components/satelliteData/exampleSatData";

// Satellite data interface
interface SatelliteData {
    satrec: SatRec;
    name: string;
    timestamp: Date;
}

// Cache the satellite data
let cachedData: {
    data: Record<string, SatelliteData>;
    timestamp: Date;
} = {
    data: {},
    timestamp: new Date(0),
};

// Map TLE data to satellite data
function mapTleToSatData(tleString: string): SatelliteData[] {
    const lines = tleString.trim().split("\n");
    const satellites: SatelliteData[] = [];
    for (let i = 0; i < lines.length; i += 3) {
        const name = lines[i].trim();
        const line1 = lines[i + 1].trim();
        const line2 = lines[i + 2].trim();
        const satrec = twoline2satrec(line1, line2);
        const timestamp = new Date();
        satellites.push({ satrec, name, timestamp });
    }
    return satellites;
}

// Fetch satellite data from Celestrak by satellite name
// eslint-disable-next-line no-unused-vars
async function fetchSatelliteData(satName: string): Promise<any> {
    const response = await fetch(
        `https://celestrak.org/NORAD/elements/gp.php?NAME=${satName}&FORMAT=TLE`,
        {
            next: {
                revalidate: 60 * 60 * 24, // revalidate every 24 hours
            },
        },
    );
    if (!response.ok) {
        throw new Error(
            `Failed to fetch satellite data: ${response.statusText}`,
        );
    }
    const data = await response.text();
    return mapTleToSatData(data);
}

// fetch satellite data from celestrak by id
// eslint-disable-next-line no-unused-vars
async function fetchSatelliteDataById(satId: string): Promise<any> {
    const response = await fetch(
        `https://celestrak.org/NORAD/elements/gp.php?CATNR=${satId}&FORMAT=TLE`,
        {
            next: {
                revalidate: 60 * 60 * 24, // revalidate every 24 hours
            },
        },
    );
    if (!response.ok) {
        throw new Error(
            `Failed to fetch satellite data: ${response.statusText}`,
        );
    }
    const data = await response.text();
    return mapTleToSatData(data);
}

// Check if cached data is stale
function isStale(timestamp: Date): boolean {
    const now = new Date();
    return now.getTime() - timestamp.getTime() > 24 * 60 * 60 * 1000;
}

export async function satLoader(satName: string): Promise<SatelliteData> {
    // The logic to check if data is stale and needs to be fetched
    if (
        !cachedData ||
        isStale(cachedData.timestamp) ||
        !(satName in cachedData.data)
    ) {
        // Fetch the data and update the cache
        // const newDataArray = await fetchSatelliteData(satName);
        const newDataArray = mapTleToSatData(exampleData);
        const satExample = newDataArray.find((sat) => sat.name == satName);
        const newData = satExample || newDataArray[0];

        cachedData = {
            data: { ...cachedData.data, [satName]: newData },
            timestamp: new Date(),
        };
    }

    return cachedData.data[satName];
}

export async function satLoaderById(satId: string): Promise<SatelliteData> {
    // The logic to check if data is stale and needs to be fetched
    if (
        !cachedData ||
        isStale(cachedData.timestamp) ||
        !(satId in cachedData.data)
    ) {
        // Fetch the data and update the cache
        const newData = await fetchSatelliteDataById(satId);

        cachedData = {
            data: { ...cachedData.data, [satId]: newData[0] },
            timestamp: new Date(),
        };
    }

    return cachedData.data[satId];
}

export type { SatelliteData };
