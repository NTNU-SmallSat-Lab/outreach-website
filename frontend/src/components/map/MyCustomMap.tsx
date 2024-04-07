"use client";
import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import { GeoJSON } from "ol/format";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import "ol/ol.css";
import { Feature } from "ol";
import { Geometry } from "ol/geom";
import globeData from "@components/map/githubglobe/files/globe-data.json";

export default function Map2d() {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const map = new Map({
            target: mapRef.current!,
            view: new View({
                center: [0, 0],
                zoom: 2,
                projection: "EPSG:4326",
            }),
        });

        const vectorSource = new VectorSource({
            features: new GeoJSON().readFeatures(globeData, {
                dataProjection: "EPSG:4326",
                featureProjection: "EPSG:3857",
            }) as Feature<Geometry>[],
        });

        const vectorLayer = new VectorLayer({
            source: vectorSource,
        });

        map.addLayer(vectorLayer);
        map.getView().fit(vectorSource.getExtent(), {
            padding: [50, 50, 50, 50],
        });

        return () => map.setTarget(undefined);
    }, []);

    return (
        <div className="h-[500px] w-full">
            <h1>2D Map</h1>
            <div ref={mapRef} className="h-full w-full"></div>
        </div>
    );
}
