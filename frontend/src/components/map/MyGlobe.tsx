import Globe, { GlobeInstance } from "globe.gl";
import * as THREE from "three";
import React, { useEffect } from "react";
import * as satellite from "satellite.js";

const EARTH_RADIUS_KM = 6371; // km
const SAT_SIZE = 500; // km
const TIME_STEP = 1 * 1000; // per frame

const SATELLITE_AMOUNT = 100; // amount of satellites to display

export default function MyGlobe() {
    const chart = React.useRef<HTMLDivElement>(null);

    const timeLogger = React.useRef<HTMLDivElement>(null);

    // useEffect is used because we want to run the code only once when the component is mounted
    useEffect(() => {
        if (chart.current) {
            let myGlobe: GlobeInstance;
            myGlobe = Globe()(chart.current)
                .globeImageUrl(
                    "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
                )
                .objectLat("lat")
                .objectLng("lng")
                .objectAltitude("alt")
                .objectFacesSurface(false)
                .objectLabel("name");

            // Set initial camera distance
            setTimeout(() => myGlobe.pointOfView({ altitude: 3.5 }));

            // Disable OrbitControls and enable auto-rotation
            myGlobe.controls().autoRotate = true;
            myGlobe.controls().enabled = false;
            // Invert rotation direction
            myGlobe.controls().autoRotateSpeed *= -1;

            // Make the satellite geometry using a sphere
            const satGeometry = new THREE.SphereGeometry(
                (SAT_SIZE * myGlobe.getGlobeRadius()) / EARTH_RADIUS_KM / 2,
                16,
                8,
            );

            // Make the satellite material
            const satMaterial = new THREE.MeshLambertMaterial({
                color: "palegreen",
                transparent: true,
                opacity: 0.7,
            });
            myGlobe.objectThreeObject(
                () => new THREE.Mesh(satGeometry, satMaterial),
            );

            // Currently using example data from the example
            fetch("../datasets/space-track-leo.txt")
                .then((r) => r.text())
                .then((rawData) => {
                    const tleData = rawData
                        .replace(/\r/g, "")
                        .split(/\n(?=[^12])/)
                        .filter((d) => d)
                        .map((tle) => tle.split("\n"));
                    const satData = tleData
                        .map(([name, ...tle]) => ({
                            satrec: satellite.twoline2satrec(
                                ...(tle as [string, string]),
                            ),
                            name: name.trim().replace(/^0 /, ""),
                        }))
                        // exclude those that can't be propagated
                        .filter(
                            (d) =>
                                !!satellite.propagate(d.satrec, new Date())
                                    .position,
                        )
                        .slice(0, SATELLITE_AMOUNT);

                    // time ticker
                    let time = new Date();
                    (function frameTicker() {
                        requestAnimationFrame(frameTicker);

                        time = new Date(+time + TIME_STEP);
                        if (timeLogger.current) {
                            timeLogger.current.innerText = time.toString();
                        }

                        // Update satellite positions
                        const gmst = satellite.gstime(time);
                        satData.forEach((d: any) => {
                            const eci = satellite.propagate(d.satrec, time);
                            if (eci.position) {
                                const gdPos = satellite.eciToGeodetic(
                                    eci.position as satellite.EciVec3<number>,
                                    gmst,
                                );
                                d.lat = THREE.MathUtils.radToDeg(
                                    gdPos.latitude,
                                );
                                d.lng = THREE.MathUtils.radToDeg(
                                    gdPos.longitude,
                                );
                                d.alt = gdPos.height / EARTH_RADIUS_KM;
                            }
                        });

                        myGlobe.objectsData(satData);
                    })();
                });
        }
    }, []);

    return (
        <>
            <div id="chart" ref={chart}></div>
            <div id="time-log" ref={timeLogger}></div>
        </>
    );
}
