import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/card";

// Dynamic import because of leaflet and globe.gl ssr problem with next.js
import dynamic from "next/dynamic";
import SatelliteFetcher from "@/components/map/SatelliteFetcher";

const MyCustomMap = dynamic(() => import("@/components/map/MyCustomMap"), {
    ssr: false,
});
const navbarLinks = ["Blog", "Projects", "Satellites"];

export default function Home() {
    return (
        <main>
            <SatelliteFetcher useExampleData={true} />

            <MyCustomMap />

            <div className="pt-8 items-center text-center flex flex-col py-12 px-8">
                <div className="prose dark:prose-invert">
                    {navbarLinks.map((link, index) => (
                        <div key={index}>
                            
                            <h1>{link}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
