"use client";
import React, { useEffect, useRef } from "react";
import Globe, { GlobeInstance } from "globe.gl";
import * as THREE from "three";
import { useSatelliteStore } from "@/lib/store";
import { convertSatrec } from "@/lib/convertSatrec";

const SAT_RADIUS = 5; // Relative size of the satellite for visualization
const UPDATE_INTERVAL_MS = 100; // Update interval in milliseconds
const EARTH_RADIUS_KM = 6371; // Earth radius in kilometers

interface initpostype {
    lat: number;
    lng: number;
    alt: number;
    name: string;
    satNumber: number;
}

export default function SatelliteGlobe() {
    const chart = useRef<HTMLDivElement>(null);
    const globeRef = useRef<GlobeInstance>();
    const {
        satelliteData,
        selectedSatellite,
        setSelectedSatellite,
        satNumToEntry,
    } = useSatelliteStore((state) => ({
        satelliteData: state.SatelliteNameToEntry,
        selectedSatellite: state.selectedSatellite,
        setSelectedSatellite: state.setSelectedSatellite,
        satNumToEntry: state.satNumToEntry,
    }));

    // Initialize the globe
    useEffect(() => {
        if (chart.current && !globeRef.current) {
            globeRef.current = Globe()(chart.current)
                .globeImageUrl(
                    "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
                )
                .backgroundImageUrl(
                    "//unpkg.com/three-globe/example/img/night-sky.png",
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
                    setSelectedSatellite(obj.satNumber);
                });

            // Set initial POV after globe instantiation
            setTimeout(() => {
                if (globeRef.current) {
                    globeRef.current.pointOfView({ altitude: 3.5 });
                }
            });

            globeRef.current.controls().enabled = true;
            globeRef.current.controls().enableZoom = false;
            globeRef.current.controls().enablePan = false;
            globeRef.current.controls().enableRotate = true;

            // lock the initial height of the globe
            const setInitialGlobeSize = () => {
                if (globeRef.current && chart.current) {
                    const { width, height } =
                        chart.current.getBoundingClientRect();
                    globeRef.current.width(width);
                    globeRef.current.height(height - 76);
                }
            };

            // Initially set the globe size to match the container
            setInitialGlobeSize();

            // set globesize on screen resize
            const setGlobeSize = () => {
                if (globeRef.current && chart.current) {
                    const { width } = chart.current.getBoundingClientRect();
                    globeRef.current.width(width);
                }
            };

            // Resize listener to update the globe size
            if (typeof window !== "undefined") {
                window.addEventListener("resize", setGlobeSize);
                return () => {
                    window.removeEventListener("resize", setGlobeSize);
                };
            }

            // Set initial positions of satellites
            let currentDate = new Date().toISOString();

            let initialPositions: initpostype[] = Object.entries(satelliteData)
                .map(([satName, sat]) => {
                    if (sat.satrec) {
                        return {
                            lat: parseFloat(
                                convertSatrec(sat.satrec, sat.name).latitudeDeg,
                            ),
                            lng: parseFloat(
                                convertSatrec(sat.satrec, sat.name)
                                    .longitudeDeg,
                            ),
                            alt:
                                parseFloat(
                                    convertSatrec(sat.satrec, currentDate)
                                        .altitude,
                                ) / EARTH_RADIUS_KM,
                            name: satName,
                            satNumber: Number(sat.satrec.satnum),
                        };
                    }
                })
                .filter((sat) => sat !== undefined) as initpostype[];

            if (initialPositions.length > 0 && globeRef.current) {
                globeRef.current.objectsData(initialPositions);
            }

            return () => {
                if (typeof window !== "undefined") {
                    window.removeEventListener("resize", setGlobeSize);
                }
            };
        }
    }, [satelliteData, setSelectedSatellite]);

    // Update satellite positions periodically, or when satelliteData changes
    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentDate = new Date().toISOString();
            if (globeRef.current) {
                const newPositions = Object.entries(satelliteData)
                    .map(([satName, sat]) => {
                        if (sat.satrec) {
                            return {
                                lat: parseFloat(
                                    convertSatrec(sat.satrec, sat.name)
                                        .latitudeDeg,
                                ),
                                lng: parseFloat(
                                    convertSatrec(sat.satrec, sat.name)
                                        .longitudeDeg,
                                ),
                                alt:
                                    parseFloat(
                                        convertSatrec(sat.satrec, currentDate)
                                            .altitude,
                                    ) / EARTH_RADIUS_KM,
                                name: satName,
                                satNumber: Number(sat.satrec.satnum),
                                color:
                                    selectedSatellite ===
                                    Number(sat.satrec.satnum)
                                        ? "red"
                                        : "palegreen",
                            };
                        }
                    })
                    .filter((sat) => sat !== undefined) as initpostype[];

                globeRef.current.objectsData(newPositions);
            }
        }, UPDATE_INTERVAL_MS);

        // Set the point of view to the selected satellite
        if (selectedSatellite !== undefined) {
            if (
                selectedSatellite !== undefined &&
                satNumToEntry[selectedSatellite].satrec
            ) {
                const targetPosition = convertSatrec(
                    satNumToEntry[selectedSatellite].satrec,
                    new Date().toISOString(),
                );

                globeRef?.current?.pointOfView(
                    {
                        lat: Number(targetPosition.latitudeDeg),
                        lng: Number(targetPosition.longitudeDeg),
                        altitude:
                            Number(targetPosition.altitude) / EARTH_RADIUS_KM +
                            3.5,
                    },
                    1700,
                );
            }
        }

        return () => clearInterval(intervalId);
    }, [satNumToEntry, satelliteData, selectedSatellite]);

    return <div id="chart" className="" ref={chart}></div>;
}
