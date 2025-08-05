"use client";

import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { createStockChartBaseConfig } from "@/lib/chartTemplate";

type OrbitDataProps = {
    orbitalData: any;
};

type ChartData = {
    epoch: Date;
    inclination: string;
    eccentricity: string;
    semiMajorAxis: number;
};

const OrbitDataGraph: React.FC<OrbitDataProps> = ({ orbitalData }) => {
    const filteredData = orbitalData.map((data: any) => {
        return {
            ...data,
            semiMajorAxis: data.semiMajorAxis - 6371,
            epoch: new Date(data.epoch.slice(0, 23) + "Z"),
        };
    });

    const inclination = filteredData.map((data: ChartData) => [
        data.epoch.getTime(),
        parseFloat(data.inclination),
    ]);
    const eccentricity = filteredData.map((data: ChartData) => [
        data.epoch.getTime(),
        parseFloat(data.eccentricity),
    ]);
    const altitude = filteredData.map((data: ChartData) => [
        data.epoch.getTime(),
        data.semiMajorAxis,
    ]);

    const optChart = createStockChartBaseConfig({
        title: "Orbital Graph Data",
        yAxisArray: [
            // First Y-axis (left) - Inclination
            {
                id: "inclination-axis",
                title: {
                    text: "",
                },
                labels: {
                    style: {
                        color: "#00d3ff", // All numbers in white
                        fontSize: "14px",
                    },
                },
                opposite: false, // Left side
            },
            // Second Y-axis (right) - Eccentricity
            {
                id: "eccentricity-axis",
                title: {
                    text: "",
                },
                labels: {
                    style: {
                        color: "#ff0000", // All numbers in red
                        fontSize: "14px",
                    },
                },
                opposite: true, // Right side
            },
            // Third Y-axis (far right) - Altitude
            {
                id: "altitude-axis",
                title: {
                    text: "",
                },

                labels: {
                    style: {
                        color: "#d3ff00", // All numbers in green
                        fontSize: "14px",
                    },
                },
                opposite: false, // Left side
            },
        ],
        series: [
            {
                name: "Inclination (°)",
                data: inclination,
                type: "line",
                color: "#00d3ff",
                marker: {
                    enabled: false, // Disable markers for cleaner look
                },
                yAxis: "inclination-axis", // Link to first Y-axis
            },
            {
                name: "Eccentricity",
                data: eccentricity,
                type: "line",
                color: "red",
                marker: {
                    enabled: false, // Disable markers for cleaner look
                },
                yAxis: "eccentricity-axis", // Link to second Y-axis
            },
            {
                name: "Altitude (km)",
                data: altitude,
                type: "line",
                color: "#d3ff00",
                marker: {
                    enabled: false, // Disable markers for cleaner look
                },
                yAxis: "altitude-axis", // Link to third Y-axis
            },
        ],
        buttons: [
            {
                type: "all",
                text: "All",
            },
            {
                type: "year",
                count: 1,
                text: "1Y",
            },
            { type: "ytd", count: 1, text: "YTD" },
            {
                type: "month",
                count: 6,
                text: "6M",
            },
            {
                type: "month",
                count: 3,
                text: "3M",
            },
            {
                type: "month",
                count: 1,
                text: "1M",
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
    });
    return (
        <div className="max-w-5xll mb-8 mt-8 h-[600px] w-full">
            {orbitalData && (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={optChart}
                    containerProps={{ className: "w-full h-full" }}
                    constructorType="stockChart"
                />
            )}
        </div>
    );
};

export default OrbitDataGraph;
