"use client";
import Globe, { GlobeInstance } from "globe.gl";
import * as THREE from "three";
import React, { useEffect } from "react";
import * as satellite from "satellite.js";

// made with the following packages:
// https://www.npmjs.com/package/globe.gl
// https://www.npmjs.com/package/satellite.js
// https://www.npmjs.com/package/three

// could possibly switch to https://www.npmjs.com/package/tle.js for TLE parsing, as it i mostly a wrapper around satellite.js

const EARTH_RADIUS_KM = 6371; // km
const SAT_SIZE = 500; // km
const TIME_STEP = 1 * 1000; // per frame
const SATELLITE_AMOUNT = 100; // amount of satellites to display

function mapRawDataToTleData(rawData: string): string[][] {
    return (
        rawData
            // Remove any carriage returns
            .replace(/\r/g, "")
            // Split the data into individual TLEs (https://en.wikipedia.org/wiki/Two-line_element_set).
            /* It splits the string at newline characters (\n) only if they are followed by a character that is not 1 or 2. The (?=[^12]) is a positive lookahead assertion,
             ensuring that the newline is followed by a character that is not 1 or 2 without including that character in the split result.*/
            .split(/\n(?=[^12])/)
            //This step filters out any empty lines from the array of substrings obtained in the previous step. The callback function (d) => d checks if the substring d is truthy, effectively removing empty lines.
            .filter((d) => d)
            /* Finally, this step maps each substring (now representing a line) into an array of lines.
             It splits each substring again using the newline character (\n) as the delimiter.
             This results in a two-dimensional array where each element is an array of lines from the original string. */
            .map((tle) => tle.split("\n"))
    );
}

export default function MyGlobe({
    satelliteDatas: satelliteDatas,
}: {
    satelliteDatas: string; // Expects a string of TLE strings such as the example files in the datasets folder
}) {
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
            // myGlobe.controls().autoRotate = true;
            // myGlobe.controls().enabled = false;
            // Invert rotation direction
            // myGlobe.controls().autoRotateSpeed *= -1;

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

            const tleData = mapRawDataToTleData(satelliteDatas);
            const satData = tleData
                .map(([name, ...tle]) => ({
                    satrec: satellite.twoline2satrec(
                        ...(tle as [string, string]), // spread the array as arguments to the function
                    ),
                    name: name.trim().replace(/^0 /, ""), // remove leading 0 from name
                }))
                // exclude those that can't be propagated
                .filter(
                    (d) => !!satellite.propagate(d.satrec, new Date()).position,
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
                        d.lat = THREE.MathUtils.radToDeg(gdPos.latitude);
                        d.lng = THREE.MathUtils.radToDeg(gdPos.longitude);
                        d.alt = gdPos.height / EARTH_RADIUS_KM;
                    }
                });

                myGlobe.objectsData(satData);
            })();
        }
    }, [satelliteDatas]);

    return (
        <>
            <div className="relative">
                <div
                    id="time-log"
                    ref={timeLogger}
                    className="absolute top-0 bottom-0 z-50 text-white text-opacity-75"
                ></div>
                <div id="chart" ref={chart}></div>
            </div>
        </>
    );
}
