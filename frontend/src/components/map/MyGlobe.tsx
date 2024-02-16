import Globe, { GlobeInstance } from "globe.gl";
import * as THREE from "three";
import React, { useEffect } from "react";
import * as satellite from "satellite.js";

const EARTH_RADIUS_KM = 6371; // km
const SAT_SIZE = 100; // km
const TIME_STEP = 3 * 1000; // per frame

export default function MyGlobe() {
    const chart = React.useRef<HTMLDivElement>(null);

    const timeLogger = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chart.current) {
            let world: GlobeInstance;
            world = Globe()(chart.current)
                .globeImageUrl(
                    "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
                )
                .objectLat("lat")
                .objectLng("lng")
                .objectAltitude("alt")
                .objectFacesSurface(false)
                .objectLabel("name");

            setTimeout(() => world.pointOfView({ altitude: 3.5 }));

            const satGeometry = new THREE.OctahedronGeometry(
                (SAT_SIZE * world.getGlobeRadius()) / EARTH_RADIUS_KM / 2,
                0,
            );

            const satMaterial = new THREE.MeshLambertMaterial({
                color: "palegreen",
                transparent: true,
                opacity: 0.7,
            });
            world.objectThreeObject(
                () => new THREE.Mesh(satGeometry, satMaterial),
            );

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
                        .slice(0, 2000);

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
                                    eci.position as EciVec3<number>,
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

                        world.objectsData(satData);
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
