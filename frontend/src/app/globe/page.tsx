"use client";
import dynamic from "next/dynamic";
const GHGlobe = dynamic(() => import("@components/map/githubglobe/GHGlobe"), {
    ssr: false,
});

export default function Page() {
    return <GHGlobe></GHGlobe>;
}
