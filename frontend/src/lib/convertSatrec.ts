import * as satellite from "satellite.js";
import { SatRec } from "satellite.js";
import globeData from "@components/map/githubglobe/files/globe-data.json";

// turf needs ts ignore to work with typescript
// @ts-ignore
import * as turf from "@turf/turf";
// @ts-ignore
import { point } from "@turf/helpers";
// @ts-ignore
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";

interface SatelliteInfo {
    name: string;
    latitudeDeg: string;
    longitudeDeg: string;
    altitude: string;
    velocity: string;
    country: string;
}

export type { SatelliteInfo };

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

// Convert satellite record to satellite info, including latitude, longitude, altitude, velocity, and country
export const convertSatrec = (
    satrec: SatRec,
    satName: string,
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
