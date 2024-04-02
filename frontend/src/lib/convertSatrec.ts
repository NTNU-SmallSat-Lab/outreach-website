import * as satellite from "satellite.js";
import { SatRec } from "satellite.js";
import { PolyUtil } from "node-geometry-library";
import globeData from "@components/map/githubglobe/files/globe-data.json";

interface SatelliteInfo {
    name: string;
    latitudeDeg: string;
    longitudeDeg: string;
    altitude: string;
    velocity: string;
    country: string;
}

export type { SatelliteInfo };

// Function to find the country of a satellite
const findCountry = (latitudeDeg: number, longitudeDeg: number): string => {
    for (const feature of globeData.features) {
        const { bbox, geometry } = feature;
        const boundingBoxPoints = [
            { lat: bbox[1], lng: bbox[0] },
            { lat: bbox[3], lng: bbox[0] },
            { lat: bbox[3], lng: bbox[2] },
            { lat: bbox[1], lng: bbox[2] },
        ];

        if (
            PolyUtil.containsLocation(
                { lat: latitudeDeg, lng: longitudeDeg },
                boundingBoxPoints,
            )
        ) {
            if (geometry.type === "Polygon") {
                const coordinates = geometry.coordinates as number[][][];
                for (const polygon of coordinates) {
                    let boundingPolygon = polygon.map((coordinate) => {
                        return { lat: coordinate[1], lng: coordinate[0] };
                    });

                    if (
                        PolyUtil.containsLocation(
                            { lat: latitudeDeg, lng: longitudeDeg },
                            boundingPolygon,
                        )
                    ) {
                        return feature.properties.ADMIN;
                    }
                }
            } else if (geometry.type === "MultiPolygon") {
                const multiPolygons = geometry.coordinates as number[][][][];
                for (const multiPolygon of multiPolygons) {
                    for (const polygon of multiPolygon) {
                        let boundingPolygon = polygon.map((coordinate) => {
                            return { lat: coordinate[1], lng: coordinate[0] };
                        });

                        if (
                            PolyUtil.containsLocation(
                                { lat: latitudeDeg, lng: longitudeDeg },
                                boundingPolygon,
                            )
                        ) {
                            return feature.properties.ADMIN;
                        }
                    }
                }
            }
        }
    }

    // Default to "Ocean" if no country is found
    return "Ocean";
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
