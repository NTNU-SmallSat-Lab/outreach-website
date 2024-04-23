import { twoline2satrec } from "satellite.js";
import { SatRec } from "satellite.js";

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

// fetch satellite data from celestrak by id
async function fetchSatelliteDataById(satId: string): Promise<any> {
    const response = await fetch(
        `https://celestrak.org/NORAD/elements/gp.php?CATNR=${satId}&FORMAT=TLE`,
        {
            next: {
                revalidate: 60 * 60 * 24, // revalidate every 24 hours
            },
        },
    );
    if (response.status === 403) {
        throw new Error(
            "403 - Forbidden: Access is denied. You are likely IP banned temporarily for making too many requests.",
        );
    }
    if (!response.ok) {
        throw new Error(
            `Failed to fetch satellite data from celestrak: ${response.statusText}`,
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

// Load satellite data by id
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
