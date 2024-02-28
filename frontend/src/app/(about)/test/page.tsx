"use client";
import SolarData from "@/components/SolarActivity/SolarData";

export default function Page() {
    return (
        <div className="m-10 flex flex-col space-y-10">
            <h1>Testing solar activity data fetching</h1>
            <hr />
            <SolarData />
        </div>
    );
}
