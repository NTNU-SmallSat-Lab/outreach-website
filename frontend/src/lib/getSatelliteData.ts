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

// Fetch satellite data from Celestrak by satellite name
async function fetchSatelliteData(satName: string): Promise<any> {
    const response = await fetch(
        `https://celestrak.org/NORAD/elements/gp.php?NAME=${satName}&FORMAT=TLE`,
    );
    if (!response.ok) {
        throw new Error(
            `Failed to fetch satellite data: ${response.statusText}`,
        );
    }
    const data = await response.text();
    return mapTleToSatData(data);
}

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
        const newDataArray = await fetchSatelliteData(satName);
        const newData = newDataArray[0];

        cachedData = {
            data: { ...cachedData.data, [satName]: newData },
            timestamp: new Date(),
        };
    }

    return cachedData.data[satName];
}

export type { SatelliteData };
