"use client";
import React, { useEffect, useRef } from "react";
import Globe, { GlobeInstance } from "globe.gl";
import * as THREE from "three";
import { useSatelliteStore } from "@/lib/store";
import { convertSatrec } from "@/lib/convertSatrec";

const SAT_RADIUS = 5; // Relative size of the satellite for visualization
const UPDATE_INTERVAL_MS = 100; // Update interval in milliseconds
const EARTH_RADIUS_KM = 6371; // Earth radius in kilometers

export default function SatelliteGlobe() {
    const chart = useRef<HTMLDivElement>(null);
    const globeRef = useRef<GlobeInstance>();
    const { satelliteData, selectedSatellite, setSelectedSatellite } =
        useSatelliteStore((state) => ({
            satelliteData: state.satelliteData,
            selectedSatellite: state.selectedSatellite,
            setSelectedSatellite: state.setSelectedSatellite,
        }));

    // Initialize the globe
    useEffect(() => {
        if (chart.current && !globeRef.current) {
            globeRef.current = Globe()(chart.current)
                .globeImageUrl(
                    "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
                ) /*
                .backgroundImageUrl(
                    "//unpkg.com/three-globe/example/img/night-sky.png",
                )*/
                .objectLat("lat")
                .objectLng("lng")
                .objectAltitude("alt")
                .objectFacesSurface(false)
                .backgroundColor("rgba(0,0,0,0)")
                .objectLabel("name")
                .objectsData([])
                .objectThreeObject((sat: any) => {
                    return new THREE.Mesh(
                        new THREE.SphereGeometry(SAT_RADIUS, 16, 8),
                        new THREE.MeshBasicMaterial({ color: sat.color }),
                    );
                })
                .onObjectClick((obj: any) => {
                    setSelectedSatellite(obj.name);
                });

            // Set initial POV after globe instantiation
            setTimeout(() => {
                if (globeRef.current) {
                    globeRef.current.pointOfView({ altitude: 3.5 });
                }
            });

            globeRef.current.controls().enabled = true;
            globeRef.current.controls().enableZoom = false;

            const setGlobeSize = () => {
                if (globeRef.current && chart.current) {
                    const { width, height } =
                        chart.current.getBoundingClientRect();
                    globeRef.current.width(width);
                    globeRef.current.height(height);
                }
            };

            // Initially set the globe size to match the container
            setGlobeSize();

            // Resize listener to update the globe size
            window.addEventListener("resize", setGlobeSize);

            // Set initial positions of satellites
            let currentDate = new Date().toISOString();
            const initialPositions = Object.values(satelliteData).map(
                (sat) => ({
                    lat: parseFloat(
                        convertSatrec(sat.satrec, currentDate).latitudeDeg,
                    ),
                    lng: parseFloat(
                        convertSatrec(sat.satrec, currentDate).longitudeDeg,
                    ),
                    alt:
                        parseFloat(
                            convertSatrec(sat.satrec, currentDate).altitude,
                        ) / EARTH_RADIUS_KM,
                    name: sat.name,
                }),
            );
            globeRef.current.objectsData(initialPositions);

            return () => {
                window.removeEventListener("resize", setGlobeSize);
            };
        }
    }, []);

    // Update satellite positions periodically, or when satelliteData changes
    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentDate = new Date().toISOString();

            if (globeRef.current) {
                const newPositions = Object.values(satelliteData).map((sat) => {
                    return {
                        lat: parseFloat(
                            convertSatrec(sat.satrec, currentDate).latitudeDeg,
                        ),
                        lng: parseFloat(
                            convertSatrec(sat.satrec, currentDate).longitudeDeg,
                        ),
                        alt:
                            parseFloat(
                                convertSatrec(sat.satrec, currentDate).altitude,
                            ) / EARTH_RADIUS_KM,
                        name: sat.name,
                        color:
                            selectedSatellite === sat.name
                                ? "red"
                                : "palegreen",
                    };
                });

                globeRef.current.objectsData(newPositions);
            }
        }, UPDATE_INTERVAL_MS);

        if (satelliteData[selectedSatellite] === undefined) {
            return;
        }

        const targetPosition = convertSatrec(
            satelliteData[selectedSatellite].satrec,
            new Date().toISOString(),
        );

        globeRef?.current?.pointOfView(
            {
                lat: Number(targetPosition.latitudeDeg),
                lng: Number(targetPosition.longitudeDeg),
                altitude: 2.5,
            },
            1700,
        );

        return () => clearInterval(intervalId);
    }, [satelliteData, selectedSatellite]);

    return <div id="chart" className="" ref={chart}></div>;
}
