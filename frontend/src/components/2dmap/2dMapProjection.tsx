"use client";
/* eslint-disable react/jsx-handler-names */
import React from "react";
import * as topojson from "topojson-client";
import { CustomProjection, Graticule } from "@visx/geo";
import { geoNaturalEarth1 } from "@visx/vendor/d3-geo";
import topology from "./world-topo.json";

export type GeoCustomProps = {
    width: number;
    height: number;
    satLatitude?: number;
    satLongitude?: number;
};

interface FeatureShape {
    type: "Feature";
    id: string;
    geometry: { coordinates: [number, number][][]; type: "Polygon" };
    properties: { name: string };
}

export const background = "";
const strokeColor = "#FFFFFF";

// @ts-expect-error
const world = topojson.feature(topology, topology.objects.units) as {
    type: "FeatureCollection";
    features: FeatureShape[];
};

export default function GeoCustom({
    width,
    height,
    satLatitude,
    satLongitude,
}: GeoCustomProps) {
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = (width / 630) * 100;

    // This function projects lat/long to the SVG coordinate system
    const projection = geoNaturalEarth1()
        .scale(scale)
        .translate([centerX, centerY]);

    // Check if both satLatitude and satLongitude are defined
    let satPoint: [number, number] | undefined;
    if (typeof satLatitude === "number" && typeof satLongitude === "number") {
        satPoint = projection([satLongitude, satLatitude]) || undefined;
    }
    return width < 10 ? null : (
        <>
            <div className="relative">
                <svg width={width} height={height}>
                    <rect
                        x={0}
                        y={0}
                        width={width}
                        height={height}
                        fill={background}
                        rx={14}
                    />
                    <CustomProjection<FeatureShape>
                        projection={geoNaturalEarth1}
                        data={world.features}
                        scale={scale}
                        translate={[centerX, centerY]}
                    >
                        {(customProjection) => (
                            <g>
                                {customProjection.features.map(({ feature, path }, i) => (
                                    <path
                                        key={`map-feature-${i}`}
                                        d={path || ""}
                                        fill={"#d3d3d3"}
                                        stroke={"#000"}
                                        strokeWidth={0.5}
                                    />
                                ))}
                                {satPoint && (
                                    <circle
                                        cx={satPoint[0]}
                                        cy={satPoint[1]}
                                        r="6"
                                        fill="red"
                                        stroke="black"
                                        strokeWidth="1"
                                    />
                                )}
                            </g>
                        )}
                    </CustomProjection>
                </svg>
            </div>
        </>
    );
}
