"use client";
import React, { useEffect, useRef } from "react";
import Globe, { GlobeInstance } from "globe.gl";
import * as THREE from "three";
import { useSatelliteStore } from "@/lib/store";
import { convertSatrec } from "@/lib/convertSatrec";

const SAT_RADIUS = 5; // Relative size of the satellite for visualization
const UPDATE_INTERVAL_MS = 10; // Update interval in milliseconds
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
                )
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
                    globeRef.current.pointOfView({ altitude: 2.5 });
                }
            });

            globeRef.current.controls().enabled = true;
            globeRef.current.controls().enableZoom = false;

            // Define the handleResize function
            const handleResize = () => {
                if (globeRef.current) {
                    if (window.innerWidth <= 768) {
                        globeRef.current.width(window.innerWidth);
                        globeRef.current.height(window.innerHeight / 2);
                    } else {
                        globeRef.current.width(window.innerWidth);
                        globeRef.current.height(window.innerHeight / 2);
                    }
                }
            };

            // Handle the resize event
            window.addEventListener("resize", handleResize);
            handleResize(); // Call it initially to set the size

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
                window.removeEventListener("resize", handleResize);
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
                        key: `${sat.name}-${selectedSatellite === sat.name ? "selected" : "not-selected"}`,
                    };
                });

                globeRef.current.objectsData(newPositions);
            }
        }, UPDATE_INTERVAL_MS);

        return () => clearInterval(intervalId);
    }, [satelliteData, selectedSatellite]);

    return <div id="chart" className="" ref={chart}></div>;
}
