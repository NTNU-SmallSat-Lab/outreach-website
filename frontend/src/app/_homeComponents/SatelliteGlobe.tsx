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
    const wrapperRef = useRef<HTMLDivElement>(null);
    const { selectedSatellite, setSelectedSatellite, satNumToEntry } =
        useSatelliteStore((state) => ({
            selectedSatellite: state.selectedSatellite,
            setSelectedSatellite: state.setSelectedSatellite,
            satNumToEntry: state.satNumToEntry,
        }));

    // Initialize the globe
    useEffect(() => {
        if (chart.current && !globeRef.current) {
            globeRef.current = Globe()(chart.current)
                .globeImageUrl("/images/earth-blue-marble.jpg")
                .backgroundImageUrl("/images/night-sky.png")
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
            const setGlobeSize = () => {
                if (globeRef.current && chart.current && wrapperRef.current) {
                    const { width } = chart.current.getBoundingClientRect();

                    globeRef.current.width(width);
                    if (typeof window !== "undefined") {
                        let windowWidth = window.innerWidth;
                        let windowHeight = window.innerHeight;

                        // If the window width is less than 640, disable controls
                        if (windowWidth <= 768) {
                            globeRef.current.controls().enabled = false;
                            globeRef.current.controls().enableRotate = false;
                            globeRef.current.height(windowWidth); // Minus navbar height and stats height
                            // Enable touch action
                            let globeElement =
                                globeRef.current.renderer().domElement;
                            globeElement.style.touchAction = "auto";
                        } else {
                            globeRef.current.controls().enabled = true;
                            globeRef.current.controls().enableRotate = true;
                            globeRef.current.height(windowHeight - 73); // Minus navbar height
                        }
                    }
                }
            };

            // Initially set the globe size to match the container
            setGlobeSize();

            // Set initial positions of satellites
            let initialPositions: initpostype[] = Object.entries(satNumToEntry)
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
                                    convertSatrec(sat.satrec, sat.name)
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

            // Add resize event listener if the window is defined (i.e., in client-side environment)
            if (typeof window !== "undefined") {
                window.addEventListener("resize", setGlobeSize);
            }

            // Cleanup function to remove the resize event listener
            // return () => {
            //     if (typeof window !== "undefined") {
            //         window.removeEventListener("resize", setGlobeSize);
            //     }
            // };
        }
    }, [satNumToEntry, setSelectedSatellite]);

    // Update satellite positions periodically, or when satelliteData changes
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (globeRef.current) {
                const newPositions = Object.values(satNumToEntry)
                    .map((sat) => {
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
                                        convertSatrec(sat.satrec, sat.name)
                                            .altitude,
                                    ) / EARTH_RADIUS_KM,
                                name: sat.name,
                                satNumber: Number(sat.satrec.satnum),
                                color:
                                    selectedSatellite ===
                                    Number(sat.satrec.satnum)
                                        ? "#2860f1"
                                        : "#56876d",
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
                    satNumToEntry[selectedSatellite].name,
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
    }, [satNumToEntry, selectedSatellite]);

    return (
        <div
            className="h-full w-full"
            ref={wrapperRef}
            onTouchMove={(e) => e.stopPropagation()}
        >
            <div id="chart" ref={chart}></div>
        </div>
    );
}
