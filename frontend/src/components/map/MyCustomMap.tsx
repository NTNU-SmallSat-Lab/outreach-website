"use client";
import { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { defaults as defaultInteractions } from "ol/interaction.js";
import { applyStyle } from "ol-mapbox-style";
import { VectorTile } from "ol/layer.js";
import { useMemo } from "react";
import { useTheme } from "next-themes";

const MyCustomMap = () => {
    // useMemo to avoid creating a new instance of the layer on every render
    const darkLayer = useMemo(() => new VectorTile({ declutter: true }), []);
    const lightLayer = useMemo(() => new VectorTile({ declutter: true }), []);

    // Custom map styling achieved using https://docs.stadiamaps.com/custom-styles/ and https://maplibre.org/maputnik
    applyStyle(darkLayer, "./mapStyleDark.json");
    applyStyle(lightLayer, "./mapStyleLight.json");

    const mapContainer = useRef(null);

    // nextjs useTheme to decide layer
    let currentLayer: VectorTile;
    const { theme } = useTheme();
    if (theme === "light") {
        currentLayer = lightLayer;
    } else {
        currentLayer = darkLayer;
    }

    // on component mount create the map and set the map refrences to the state
    useEffect(() => {
        const mapInstance = new Map({
            interactions: defaultInteractions({
                // doubleClickZoom: false,
                // dragPan: false,
                // mouseWheelZoom: false,
            }),
            layers: [currentLayer],
            view: new View({
                //Coordinate System: WGS 84 / Pseudo-Mercator-EPSG:3857
                center: [0, 0],
                zoom: 1,
            }),
        });
        if (mapContainer.current) {
            mapInstance.setTarget(mapContainer.current);
        }

        // on component unmount remove the map refrences to avoid unexpected behaviour
        return () => {
            mapInstance.setTarget(undefined);
        };
    }, [currentLayer, darkLayer]);

    return (
        <>
            <div
                ref={mapContainer}
                className="relative aspect-square w-full bg-neutral-600"
            ></div>
        </>
    );
};
export default MyCustomMap;
