import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { DateTime } from "luxon";
import "chartjs-adapter-luxon";

interface SolarDataEntry {
    [0]: string; // Date
    [1]: string; // Kp value
    [2]: "predicted" | "estimated" | "observed"; // Tag
}
type SolarData = SolarDataEntry[];

// Fetch solar activity data
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

    // Fetch data when component mounts
    useEffect(() => {
        getSolarData()
            .then((data) => setSolarData(data))
            .catch((err) => console.error(err));
    }, []);

    // Create chart when data is fetched
    useEffect(() => {
        const solarDataChart = chartRef.current;

        if (
            solarData &&
            solarDataChart &&
            solarDataChart instanceof HTMLCanvasElement
        ) {
            Chart.register(...registerables);

            // Group solarData by tag
            const groupedData = solarData.reduce(
                (acc, data) => {
                    const tag = data[2];
                    if (!acc[tag]) {
                        acc[tag] = [];
                    }
                    const timestamp = DateTime.fromSQL(data[0]).toMillis();
                    acc[tag].push({ x: timestamp, y: parseFloat(data[1]) });
                    return acc;
                },
                {} as Record<string, { x: number; y: number }[]>,
            );
            console.log(groupedData);

            // Connect last 'observed' to first 'estimated' and last 'estimated' to first 'predicted'
            if (groupedData["observed"] && groupedData["estimated"]) {
                const lastObserved =
                    groupedData["observed"][groupedData["observed"].length - 1];
                groupedData["estimated"].unshift(lastObserved);
            }
            if (groupedData["estimated"] && groupedData["predicted"]) {
                const lastEstimated =
                    groupedData["estimated"][
                        groupedData["estimated"].length - 1
                    ];
                groupedData["predicted"].unshift(lastEstimated);
            }

            // Create datasets from the grouped and adjusted data
            const datasets = Object.keys(groupedData).map((tag) => ({
                label: tag.charAt(0).toUpperCase() + tag.slice(1),
                data: groupedData[tag],
                fill: false,
                borderColor:
                    tag === "predicted"
                        ? "rgb(255, 99, 132)"
                        : tag === "estimated"
                          ? "rgb(54, 162, 235)"
                          : "rgb(75, 192, 192)",
                borderDash: tag === "predicted" ? [5, 5] : [],
                tension: 0.3,
            }));

            // Create chart
            const chart = new Chart(solarDataChart, {
                type: "line",
                data: {
                    datasets,
                },
                options: {
                    scales: {
                        x: {
                            type: "time",
                            time: {
                                unit: "day", // Or another appropriate unit for your data
                                tooltipFormat: "MMM D",
                                displayFormats: {
                                    day: "MMM D",
                                },
                            },
                            ticks: {
                                source: "auto",
                            },
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: "Kp value",
                            }
                        },
                    },
                    plugins: {
                        legend: {
                            display: true,
                        },
                    },
                },
            });

            return () => {
                chart.destroy();
            };
        }
    }, [solarData]);

    return (
        <div>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}
