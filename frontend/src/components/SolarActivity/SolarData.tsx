import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";

interface SolarDataEntry {
    [0]: string;
    [1]: string;
}

type SolarData = SolarDataEntry[];

async function getSolarData(): Promise<SolarData> {
    const res = await fetch(
        "https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json",
    );

    if (!res.ok) {
        throw new Error("Failed to fetch solar activity data");
    }

    return res.json();
}

export default function SolarData() {
    const [solarData, setSolarData] = useState<SolarData | null>(null);
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        getSolarData()
            .then((data) => setSolarData(data))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        const solarDataChart = chartRef.current;

        if (
            solarData &&
            solarDataChart &&
            solarDataChart instanceof HTMLCanvasElement
        ) {
            Chart.register(...registerables);

            const chart = new Chart(solarDataChart, {
                type: "line",
                data: {
                    labels: solarData.map((data) => data[0]),
                    datasets: [
                        {
                            label: "Kp Index",
                            data: solarData.map((data) => +data[1]),
                            fill: false,
                            borderColor: "rgb(75, 192, 192)",
                            tension: 0.1,
                        },
                    ],
                },
            });

            return () => {
                chart.destroy();
            };
        }
    }, [solarData]);

    return (
        <div>
            <h2>Solar Activity Data</h2>
            <canvas ref={chartRef}></canvas>
            <hr />
            <pre>{JSON.stringify(solarData, null, 2)}</pre>
        </div>
    );
}
