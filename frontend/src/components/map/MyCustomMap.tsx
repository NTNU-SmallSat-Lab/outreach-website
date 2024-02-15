"use client";
import { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { defaults as defaultInteractions } from "ol/interaction.js";
import { applyStyle } from "ol-mapbox-style";
import { VectorTile } from "ol/layer.js";
import { useMemo } from "react";

const MyCustomMap = () => {
    // useMemo to avoid creating a new instance of the layer on every render
    const darkLayer = useMemo(() => new VectorTile({ declutter: true }), []);
    const lightLayer = useMemo(() => new VectorTile({ declutter: true }), []);

    // Custom map styling achieved using https://docs.stadiamaps.com/custom-styles/ and https://maplibre.org/maputnik
    applyStyle(darkLayer, "./mapStyleDark.json");
    applyStyle(lightLayer, "./mapStyleLight.json");

    const mapContainer = useRef(null);

    // Create a state variable for the map
    const [map, setMap] = useState<Map>();

    // Create a state variable for the current layer
    const [currentLayer, setCurrentLayer] = useState(darkLayer);

    // on component mount create the map and set the map refrences to the state
    useEffect(() => {
        const mapInstance = new Map({
            interactions: defaultInteractions({
                doubleClickZoom: false,
                dragPan: false,
                mouseWheelZoom: false,
            }),
            layers: [currentLayer],
            view: new View({
                //Coordinate System: WGS 84 / Pseudo-Mercator-EPSG:3857
                center: [0, 0],
                zoom: 2,
            }),
        });
        if (mapContainer.current) {
            mapInstance.setTarget(mapContainer.current);
        }

        setMap(mapInstance);

        // on component unmount remove the map refrences to avoid unexpected behaviour
        return () => {
            mapInstance.setTarget(undefined);
        };
    }, [currentLayer, darkLayer]);

    // Function to swap the layers
    const swapLayers = () => {
        if (map) {
            map.getLayers().clear();
            const newLayer =
                currentLayer === darkLayer ? lightLayer : darkLayer;
            map.addLayer(newLayer);
            setCurrentLayer(newLayer);
        }
    };

    return (
        <>
            <button onClick={swapLayers}>Swap Layers</button>
            <div
                ref={mapContainer}
                className="relative w-full h-[calc(75vh-72px)] bg-neutral-700"
            ></div>
        </>
    );
};
export default MyCustomMap;
