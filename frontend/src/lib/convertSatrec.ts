import * as satellite from "satellite.js";
import { SatRec } from "satellite.js";
import globeData from "@/app/_homeComponents/files/globe-data.json";

// turf needs ts ignore to work with typescript
// @ts-ignore
import * as turf from "@turf/turf";
// @ts-ignore
import { point } from "@turf/helpers";
// @ts-ignore
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { SatelliteName } from "./store";

/**
 * Represents information about a satellite.
 */
interface SatelliteInfo {
    [key: string]: any;
    name: string;
    latitudeDeg: string;
    longitudeDeg: string;
    altitude: string;
    velocity: string;
    country: string;
}

/**
 * Represents information about a satellite's future position.
 */
interface SatelliteFutureInfo {
    latitudeDeg: string;
    longitudeDeg: string;
    time: number; // Time of the future position in ISO format
}

export type { SatelliteInfo, SatelliteFutureInfo };

/**
 * Finds the country name based on the given latitude and longitude coordinates.
 * @param latitudeDeg - The latitude in degrees.
 * @param longitudeDeg - The longitude in degrees.
 * @returns The name of the country if found, otherwise "Ocean".
 */
const findCountry = (latitudeDeg: number, longitudeDeg: number): string => {
    const pointFeature = point([longitudeDeg, latitudeDeg]);

    for (const feature of globeData.features) {
        const { geometry } = feature;
        // Create a polygon or multiPolygon feature depending on the geometry type
        const turfGeometry =
            geometry.type === "Polygon"
                ? turf.polygon(geometry.coordinates)
                : turf.multiPolygon(geometry.coordinates);
        // Check if the point is within the geometry
        if (booleanPointInPolygon(pointFeature, turfGeometry)) {
            return feature.properties.ADMIN;
        }
    }

    return "Ocean"; // Fallback in case no country is found
};

/**
 * Converts a SatRec object to SatelliteInfo.
 *
 * @param satrec - The SatRec object to convert.
 * @param satName - The name of the satellite.
 * @returns The converted SatelliteInfo object.
 */
export const convertSatrec = (
    satrec: SatRec,
    satName: SatelliteName,
): SatelliteInfo => {
    if (!satrec) {
        return {
            name: satName,
            latitudeDeg: "N/A",
            longitudeDeg: "N/A",
            altitude: "N/A",
            velocity: "N/A",
            country: "N/A",
        };
    }

    const positionAndVelocity = satellite.propagate(satrec, new Date());
    

    const gmst = satellite.gstime(new Date());
    const positionEci = positionAndVelocity.position;
    const velocityEci = positionAndVelocity.velocity;

    let positionGd;
    if (positionEci && typeof positionEci !== "boolean") {
        positionGd = satellite.eciToGeodetic(positionEci, gmst);
    }

    let latitudeDeg = 0;
    let longitudeDeg = 0;
    let altitude = 0;
    if (positionGd && typeof positionGd !== "boolean") {
        latitudeDeg = satellite.degreesLat(positionGd.latitude);
        longitudeDeg = satellite.degreesLong(positionGd.longitude);
        altitude = positionGd.height;
    }

    let velocity = 0;
    if (velocityEci && typeof velocityEci !== "boolean") {
        velocity = Math.sqrt(
            velocityEci.x * velocityEci.x +
                velocityEci.y * velocityEci.y +
                velocityEci.z * velocityEci.z,
        );
    }

    // Find the country of the satellite
    const country = findCountry(latitudeDeg, longitudeDeg);

    return {
        name: satName,
        latitudeDeg: latitudeDeg.toFixed(2),
        longitudeDeg: longitudeDeg.toFixed(2),
        altitude: altitude.toFixed(2),
        velocity: velocity.toFixed(2),
        country: country,
    };
};

/**
 * Predicts the future positions of a satellite based on its current state.
 *
 * @param satrec - The satellite's state information.
 * @param projectionAmount - The number of minutes to project into the future.
 * @returns An array of future positions of the satellite.
 */
export const predictFuturePositions = (
    satrec: SatRec,
    projectionAmount: number,
): SatelliteFutureInfo[] => {
    const futurePositions: SatelliteFutureInfo[] = [];
    const now = new Date();

    // Predict the satellite's position every minute for the next projectionAmount minutes
    const step = projectionAmount < 0 ? -1 : 1;
    for (
        let i = 0;
        step > 0 ? i <= projectionAmount : i >= projectionAmount;
        i += step
    ) {
        const futureTime = new Date(now.getTime() + i * 60000);

        const positionAndVelocity = satellite.propagate(satrec, futureTime);
        const gmst = satellite.gstime(futureTime);
        const positionEci = positionAndVelocity.position;

        let positionGd;
        if (positionEci && typeof positionEci !== "boolean") {
            positionGd = satellite.eciToGeodetic(positionEci, gmst);
        }

        if (positionGd && typeof positionGd !== "boolean") {
            const latitudeDeg = satellite.degreesLat(positionGd.latitude);
            const longitudeDeg = satellite.degreesLong(positionGd.longitude);

            futurePositions.push({
                longitudeDeg: longitudeDeg.toFixed(2),
                latitudeDeg: latitudeDeg.toFixed(2),
                time: futureTime.getTime(), // Store time in milliseconds
            });
        }
    }

    return futurePositions;
};
