"use client";
import React, { Suspense } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Model({ url }: { url: string }) {
    const { scene } = useGLTF(url);

    return <primitive object={scene} scale={0.002} />;
}
export default function Render3DMod({ url }: { url: string }) {
    return (
        <div className="flex h-[500px] w-full items-center justify-center bg-black">
            <Canvas camera={{ position: [10, 10, 5] }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[10, 10, 10]} intensity={0.5} />
                <Suspense fallback={null}>
                    <Model url={url} />
                </Suspense>
                <OrbitControls />
            </Canvas>
        </div>
    );
}
