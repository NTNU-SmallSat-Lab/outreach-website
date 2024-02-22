"use client";
import React, { useEffect } from "react";
import { Chart } from "chart.js";

async function getSolarData() {
    const res = await fetch(
        "https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json",
    );

    if (!res.ok) {
        throw new Error("Failed to fetch solar activity data");
    }

    return res.json();
}

export default function SolarData() {
    useEffect(() => {
        getSolarData()
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <>
            <h1>Solar Data</h1>
        </>
    );
}
