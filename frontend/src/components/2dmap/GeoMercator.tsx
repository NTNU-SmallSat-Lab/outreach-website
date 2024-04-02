"use client";
import React from "react";
import { scaleQuantize } from "@visx/scale";
import { Mercator, Graticule } from "@visx/geo";
import * as topojson from "topojson-client";
import topology from "./world-topo.json";

export const background = "#f9f7e8";

export type GeoMercatorProps = {
    width: number;
    height: number;
    events?: boolean;
};

interface FeatureShape {
    type: "Feature";
    id: string;
    geometry: { coordinates: [number, number][][]; type: "Polygon" };
    properties: { name: string };
}

// @ts-expect-error
const world = topojson.feature(topology, topology.objects.units) as {
    type: "FeatureCollection";
    features: FeatureShape[];
};

const color = scaleQuantize({
    domain: [
        Math.min(...world.features.map((f) => f.geometry.coordinates.length)),
        Math.max(...world.features.map((f) => f.geometry.coordinates.length)),
    ],
    range: [
        "#ffb01d",
        "#ffa020",
        "#ff9221",
        "#ff8424",
        "#ff7425",
        "#fc5e2f",
        "#f94b3a",
        "#f63a48",
    ],
});

export default function GeoMercator({
    width,
    height,
    events = false,
}: GeoMercatorProps) {
    const centerX = width / 2;
    // Adjust centerY to better center the map vertically without an arbitrary offset.
    const centerY = height / 2;
    // Experiment with the scale to ensure the entire map fits within the SVG's dimensions.
    const scale = Math.min(width, height) / 10; // Adjust this value as needed.

    // Consider adding viewBox to SVG for more control over scaling and positioning.
    return width < 10 ? null : (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <rect
                x={0}
                y={0}
                width={width}
                height={height}
                fill={background}
                rx={14}
            />
            <Mercator<FeatureShape>
                data={world.features}
                scale={scale}
                // Adjust translate to better fit the map within the SVG container.
                translate={[centerX, centerY]}
            >
                {(mercator) => (
                    <g>
                        <Graticule
                            graticule={(g) => mercator.path(g) || ""}
                            stroke="rgba(33,33,33,0.05)"
                        />
                        {mercator.features.map(({ feature, path }, i) => (
                            <path
                                key={`map-feature-${i}`}
                                d={path || ""}
                                fill={color(
                                    feature.geometry.coordinates.length,
                                )}
                                stroke={background}
                                strokeWidth={0.5}
                            />
                        ))}
                    </g>
                )}
            </Mercator>
        </svg>
    );
}
