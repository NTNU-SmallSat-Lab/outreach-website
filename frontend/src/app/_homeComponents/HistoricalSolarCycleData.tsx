"use client";
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { createStockChartBaseConfig } from "@/lib/chartTemplate";

export default function HistoricalSolarCycleData() {
    const [historicalSunSpot, setHistoricalSunSpot] = useState<any>(null);
    const [historicalTimestamps, setHistoricalTimestamps] = useState<number[]>(
        [],
    );

    useEffect(() => {
        fetch("https://services.swpc.noaa.gov/json/solar-cycle/sunspots.json")
            .then((response) => {
                // Check if the response is ok
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                const formattedData = data.map((entry: any) => {
                    return {
                        date: entry["time-tag"],
                        ssn: Number(entry.ssn),
                    };
                });
                setHistoricalTimestamps(formattedData.map((d: any) => d.date));
                setHistoricalSunSpot(formattedData.map((d: any) => d.ssn));
            })
            .catch((error) => {
                console.error(
                    "Error fetching full historical Kp index data:",
                    error,
                );
            });
    }, []);

    const formattedHistoricalData = historicalTimestamps.map(
        (timestamp, index) => [
            new Date(timestamp).getTime(), // Convert to Unix timestamp (milliseconds)
            historicalSunSpot[index], // Corresponding sunspot value
        ],
    );

    const calculateMovingAverage = (
        data: number[][],
        windowSize: number,
    ): number[][] => {
        const smoothedData: number[][] = [];
        for (let i = 0; i < data.length; i++) {
            if (i < windowSize - 1) {
                smoothedData.push([data[i][0], data[i][1]]); // Keep original value for the first points
            } else {
                const window = data.slice(i - windowSize + 1, i + 1);
                const average =
                    window.reduce((sum, point) => sum + point[1], 0) /
                    windowSize;
                smoothedData.push([data[i][0], average]);
            }
        }
        return smoothedData;
    };
    const smoothedHistoricalData = calculateMovingAverage(
        formattedHistoricalData,
        10,
    );

    const optionsHistoricalChart = createStockChartBaseConfig({
        title: "Historical Solar Cycle Data",
        yAxisTitle: "Sunspot Number (SSN)",
        yAxisArray: [],
        series: [
            {
                name: "Sunspot Number",
                data: formattedHistoricalData, // Use timestamped data
                type: "line", // Line chart for historical data
                color: "#00d3ff", // Customize the line color
            },
            {
                name: "Smoothed Sunspot Number",
                data: smoothedHistoricalData,
                type: "line", // Smoothed line chart
                color: "#ffabc8", // Customize the smoothed line color
            },
        ],

        legend: {
            enabled: true,
            itemStyle: {
                color: "#ffffff",
                fontSize: "14px",
            },
            itemHoverStyle: {
                color: "#00d3ff",
            },
        },
        credits: {
            enabled: true,
            text: "Data Source: NOAA SWPC",
            href: "https://www.swpc.noaa.gov/products/solar-cycle-progression",
            style: {
                color: "#ffffff", // Customize credits text color
                fontSize: "12px", // Customize credits text size
                textDecoration: "underline",
            },
        },
    });

    return (
        <div
            className="mb-8 mt-8 h-[600px] w-full max-w-5xl"
            style={{
                margin: "20px auto", // Add margin around the chart
            }}
        >
            <HighchartsReact
                highcharts={Highcharts}
                options={optionsHistoricalChart}
                containerProps={{ className: "w-full h-full" }}
                constructorType="stockChart"
            />
        </div>
    );
}
