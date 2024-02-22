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
import { render } from "react-dom";
var renderer: WebGLRenderer;
var camera: PerspectiveCamera;
var scene: Scene;
var controls: OrbitControls;
var Globe: ThreeGlobe;
var myCanvas: HTMLCanvasElement;
var viewportDimensions: DOMRect;

// SECTION Initializing core ThreeJS elements
function init() {
    // Initialize renderer
    myCanvas = document.getElementById("gh-globe-canvas")! as HTMLCanvasElement;

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
    camera.position.y = 0;

    scene.add(camera);

    // Additional effects
    scene.fog = new Fog(0x535ef3, 400, 2000);

    // Helpers
    // const axesHelper = new AxesHelper(800);
    // scene.add(axesHelper);
    // var helper = new DirectionalLightHelper(dLight);
    // scene.add(helper);
    // var helperCamera = new CameraHelper(dLight.shadow.camera);
    // scene.add(helperCamera);

    // Initialize controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 200;
    controls.maxDistance = 500;
    controls.rotateSpeed = 0.8;
    controls.zoomSpeed = 1;
    controls.autoRotate = true;
    controls.enableZoom = false;

    controls.minPolarAngle = Math.PI / 3.5;
    controls.maxPolarAngle = Math.PI - Math.PI / 3;

    window.addEventListener("resize", onWindowResize, false);
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
        .atmosphereColor("#3a228a")
        .atmosphereAltitude(0.25)
        .hexPolygonColor("rgba(255,255,255, 0.7)");

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

// function onMouseMove(event: MouseEvent) {
//     mouseX = event.clientX - windowHalfX;
//     mouseY = event.clientY - windowHalfY;
//     // console.log("x: " + mouseX + " y: " + mouseY);
// }

function onWindowResize() {
    camera.aspect = myCanvas.clientWidth / myCanvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(myCanvas.clientWidth, myCanvas.clientHeight, false);
}

function animate() {
    // camera.position.x +=
    //     Math.abs(mouseX) <= windowHalfX / 2
    //         ? (mouseX / 2 - camera.position.x) * 0.005
    //         : 0;
    // camera.position.y += (-mouseY / 2 - camera.position.y) * 0.005;
    camera.lookAt(scene.position);
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

export default function GHGlobe() {
    useEffect(() => {
        init();
        initGlobe();
        onWindowResize();
        animate();
    }, []);

    return (
        <canvas
            id="gh-globe-canvas"
            className="w-full min-h-[calc(100vh-72px)]"
        ></canvas>
    );
}
