import React from "react";
import * as topojson from "topojson-client";
// @ts-ignore
import { CustomProjection } from "@visx/geo";
import { geoNaturalEarth1 } from "@visx/vendor/d3-geo";
import topology from "./world-topo.json";

export type GeoCustomProps = {
    width: number;
    height: number;
    satLatitude?: number;
    satLongitude?: number;
    futurePositions?: [number, number][];
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

export default function Map2dNaturalProjection({
    width,
    height,
    satLatitude,
    satLongitude,
    futurePositions,
}: GeoCustomProps) {
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = (width / 630) * 100;

    const projection = geoNaturalEarth1()
        .scale(scale)
        .translate([centerX, centerY]);

    let satPoint: [number, number] | undefined;
    if (typeof satLatitude === "number" && typeof satLongitude === "number") {
        satPoint = projection([satLongitude, satLatitude]) || undefined;
    }

    // Function to interpolate the green color based on the index
    const interPolateColor = (index: number, total: number) => {
        const startColor = { r: 40, g: 96, b: 241 };
        const endColor = { r: 241, g: 20, b: 40 };
        const ratio = index / total;
        const r = Math.round((1 - ratio) * startColor.r + ratio * endColor.r);
        const g = Math.round((1 - ratio) * startColor.g + ratio * endColor.g);
        const b = Math.round((1 - ratio) * startColor.b + ratio * endColor.b);
        return `rgb(${r}, ${g}, ${b})`;
    };

    return (
        <>
            <div className="relative">
                <svg width={width} height={height}>
                    <rect
                        x={0}
                        y={0}
                        width={width}
                        height={height}
                        fill={"#000"}
                    />
                    <CustomProjection<FeatureShape>
                        projection={geoNaturalEarth1}
                        data={world.features}
                        scale={scale}
                        translate={[centerX, centerY]}
                    >
                        {(customProjection) => (
                            <g>
                                {customProjection.features.map(
                                    ({ path }, i) => (
                                        <path
                                            key={`map-feature-${i}`}
                                            d={path || ""}
                                            fill={"#FFFFFF"}
                                            stroke={"#000"}
                                            strokeWidth={0.5}
                                        />
                                    ),
                                )}
                                {futurePositions &&
                                    futurePositions.map(([lng, lat], i) => {
                                        const point = projection([lng, lat]);
                                        return (
                                            point && (
                                                <circle
                                                    key={`future-position-${i}`}
                                                    cx={point[0]}
                                                    cy={point[1]}
                                                    r={width < 500 ? 3 : 5}
                                                    fill={interPolateColor(
                                                        i,
                                                        futurePositions.length -
                                                            1,
                                                    )}
                                                />
                                            )
                                        );
                                    })}
                                {satPoint && (
                                    <circle
                                        cx={satPoint[0]}
                                        cy={satPoint[1]}
                                        r={width < 500 ? 5 : 10}
                                        fill={interPolateColor(0, 1)}
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
