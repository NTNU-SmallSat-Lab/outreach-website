"use client";
import ThreeGlobe from "three-globe";
import { WebGLRenderer, Scene } from "three";
import * as THREE from "three";
import {
    PerspectiveCamera,
    AmbientLight,
    DirectionalLight,
    Color,
    Fog,
    // AxesHelper,
    // DirectionalLightHelper,
    // CameraHelper,
    PointLight,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import countries from "./files/globe-data-min.json";
import { useEffect } from "react";
import * as satellite from "satellite.js";
import { SatelliteData } from "@/lib/mapHelpers";
import Tooltip from "./tooltip";

const EARTH_RADIUS_KM = 6371; // km
const SAT_SIZE = 250; // km

var satDataArray: SatelliteData[] = [];

var renderer: WebGLRenderer;
var camera: PerspectiveCamera;
var scene: Scene;
var controls: OrbitControls;
var Globe: ThreeGlobe;
var myCanvas: HTMLCanvasElement;
var viewportDimensions: DOMRect;
var tooltipDiv: HTMLDivElement;

var raycaster: THREE.Raycaster;
var pointer: THREE.Vector2;
var tooltipPointer: THREE.Vector2;

// SECTION Initializing core ThreeJS elements
function init() {
    // Initialize renderer
    myCanvas = document.getElementById("gh-globe-canvas")! as HTMLCanvasElement;
    tooltipDiv = document.getElementById("tooltip-globe")! as HTMLDivElement;

    renderer = new WebGLRenderer({ antialias: true, canvas: myCanvas });
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setSize(myCanvas.clientWidth, myCanvas.clientHeight, false);

    // Initialize scene, light
    scene = new Scene();
    scene.add(new AmbientLight(0xbbbbbb, 0.3));
    scene.background = new Color(0x0e100f);

    // Initialize camera, light
    viewportDimensions = myCanvas.getBoundingClientRect();
    camera = new PerspectiveCamera();
    camera.aspect = viewportDimensions.width / viewportDimensions.height;
    camera.updateProjectionMatrix();

    // Raycaster
    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();
    tooltipPointer = new THREE.Vector2();

    var dLight = new DirectionalLight(0xffffff, 0.8);
    dLight.position.set(-800, 2000, 400);
    camera.add(dLight);

    var dLight1 = new DirectionalLight(0x7982f6, 1);
    dLight1.position.set(-100, 300, 200);
    camera.add(dLight1);

    var dLight2 = new PointLight(0x8566cc, 0.5);
    dLight2.position.set(-200, 500, 200);
    camera.add(dLight2);

    camera.position.z = 400;
    camera.position.x = 0;
    camera.position.y = 200;

    scene.add(camera);

    // Additional effects
    scene.fog = new Fog(0x535ef3, 400, 2000);

    // Initialize controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 200;
    controls.maxDistance = 500;
    controls.rotateSpeed = 0.7;
    controls.zoomSpeed = 1;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.1;
    controls.enableZoom = false;

    controls.minPolarAngle = Math.PI / 3.5;
    controls.maxPolarAngle = Math.PI - Math.PI / 3;

    window.addEventListener("resize", onWindowResize, false);
    window.addEventListener("mousemove", onPointerMove);
    // document.addEventListener("mousemove", onMouseMove);
}

// SECTION Globe
function initGlobe() {
    // Initialize the Globe
    Globe = new ThreeGlobe({
        waitForGlobeReady: true,
        animateIn: true,
    })
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .showAtmosphere(true)
        .atmosphereAltitude(0.25)
        .hexPolygonColor(() => "#ffffff")
        .atmosphereColor("#00509e")
        .objectLat("lat")
        .objectAltitude("alt")
        .objectLng("lng")
        .objectFacesSurface(false);

    Globe.rotateY(-Math.PI * (5 / 9));
    Globe.rotateZ(-Math.PI / 6);
    const globeMaterial = new THREE.MeshLambertMaterial({
        color: "#00509e",
        transparent: true,
        opacity: 1,
    });
    Globe.globeMaterial(globeMaterial);

    // NOTE Cool stuff
    // globeMaterial.wireframe = true;

    scene.add(Globe);
}

function initSatellites() {
    // Make the satellite geometry using a sphere
    const satGeometry = new THREE.SphereGeometry(
        (SAT_SIZE * Globe.getGlobeRadius()) / EARTH_RADIUS_KM / 2,
        16,
        8,
    );

    // Make the satellite material
    const satMaterial = new THREE.MeshLambertMaterial({
        color: "palegreen",
        transparent: true,
        opacity: 0.7,
    });

    // Set which object to render satellites as
    Globe.objectThreeObject((obj: any) => {
        let object = new THREE.Mesh(satGeometry, satMaterial);
        object.userData = { name: obj.name };
        return object;
    });

    updateSatellites();
}

function updateSatellites() {
    // Get current time
    let time = new Date();

    const gmst = satellite.gstime(time);
    satDataArray.forEach((d: any) => {
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

    Globe.objectsData(satDataArray);
}

function onPointerMove(event: MouseEvent) {
    let rect = myCanvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    tooltipPointer.x = event.clientX;
    tooltipPointer.y = event.clientY;
}

function onWindowResize() {
    camera.aspect = myCanvas.clientWidth / myCanvas.clientHeight;
    camera.updateProjectionMatrix();
    // renderer.setSize(myCanvas.clientWidth, myCanvas.clientHeight, false); // I dont know why, but this line breaks the sizing after resizing window
}

function animate() {
    updateSatellites();
    camera.lookAt(scene.position);
    controls.update();

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        let first = intersects[0].object;
        if (first.userData.name) {
            tooltipDiv.style.visibility = "visible";
            tooltipDiv.innerHTML = first.userData.name;
            tooltipDiv.style.left = tooltipPointer.x + "px";
            tooltipDiv.style.top = tooltipPointer.y + "px";
        }
    } else {
        tooltipDiv.style.visibility = "hidden";
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

export default function GHGlobe({ satDatas }: { satDatas: SatelliteData[] }) {
    useEffect(() => {
        satDataArray = satDatas;
        init();
        initGlobe();
        onWindowResize();
        initSatellites();
        animate();
    });

    return (
        <div>
            <canvas
                id="gh-globe-canvas"
                className="min-h-[calc(100vh-72px)] w-full"
            ></canvas>
            <Tooltip id="tooltip-globe">TEST</Tooltip>
        </div>
    );
}
