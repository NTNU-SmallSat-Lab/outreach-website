import { twoline2satrec } from "satellite.js";
import { SatRec } from "satellite.js";

interface SatelliteData {
    satrec: SatRec;
    name: string;
}

let cachedData: {
    data: SatelliteData[];
    timestamp: Date;
} | null = null;

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

function mapTleToSatData(tleString: string): SatelliteData[] {
    const lines = tleString.trim().split("\n");
    const satellites: SatelliteData[] = [];
    for (let i = 0; i < lines.length; i += 3) {
        const name = lines[i].trim();
        const line1 = lines[i + 1].trim();
        const line2 = lines[i + 2].trim();
        const satrec = twoline2satrec(line1, line2);
        satellites.push({ satrec, name });
    }
    return satellites;
}

// Check if cached data is stale
function isStale(timestamp: Date): boolean {
    const now = new Date();
    return now.getTime() - timestamp.getTime() > 24 * 60 * 60 * 1000;
}

export async function loader(satName: string): Promise<SatelliteData[]> {
    if (cachedData && !isStale(cachedData.timestamp)) {
        return cachedData.data;
    }

    const newData = await fetchSatelliteData(satName);
    cachedData = {
        data: newData,
        timestamp: new Date(),
    };

    console.log(newData);

    return newData;
}

export type { SatelliteData };
