"use client";
import React, { useState, useEffect } from "react";
import { useSatelliteStore } from "@/lib/store";
import { SatelliteNumber } from "@/lib/store";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { time } from "console";

export default function SatTelemetry({
    STRAPI_URL,
    noradID,
}: {
    STRAPI_URL: string | undefined;
    noradID: number | undefined;
}) {
    const satNumToEntry = useSatelliteStore((state) => state.satNumToEntry);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        async function fetchTelemetryData() {
            try {
                let satSQL;
                if (noradID !== undefined) {
                    const satName: string | undefined =
                        satNumToEntry[noradID as SatelliteNumber]?.name;
                    if (satName === "HYPSO-1") satSQL = "hypso1";
                    if (satName === "HYPSO-2") satSQL = "hypso2";
                }
                const queryDetails = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        satSQL: satSQL,
                    }),
                };
                setLoading(true);
                const query = await fetch(
                    STRAPI_URL + "/api/grafana-metrics",
                    queryDetails,
                );
                if (!query.ok) {
                    throw new Error(
                        `Error fetching telemetry data: ${query.status}`,
                    );
                }
                const responseData = await query.json();
                if (!responseData || responseData.length === 0) {
                    throw new Error("No telemetry data available");
                }
                setData(responseData);
            } catch (error) {
                console.error("Error fetching telemetry data:", error);
                setError(
                    `Failed to load telemetry data. Please try again later. ${error}`,
                );
            } finally {
                setLoading(false);
            }
        }
        fetchTelemetryData();
    }, [STRAPI_URL, noradID, satNumToEntry]);

    if (loading) {
        return <div>Loading telemetry data...</div>;
    }
    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    const currentTime = Date.now();

    {
        /* Battery Voltage Data */
    }
    const batteryVoltageData = data?.batteryVoltage;
    const chartDataVBatt = batteryVoltageData[0].map(
        (timestamp: number, index: number) => [
            timestamp,
            batteryVoltageData[1][index] / 1000,
        ],
    );

    {
        /* Battery Current Data */
    }

    const batteryCurrentData = [data?.battCurrIn, data?.battCurrOut].filter(
        (curr) => curr,
    ); // Filter out any undefined values
    const chartDataIBatt = batteryCurrentData.map(
        (currData: any, currIndex: number) => ({
            name:
                currIndex === 0 ? "Battery Current In" : "Battery Current Out",
            data: currData[0]
                .map((timestamp: number, index: number) => [
                    timestamp,
                    currData[1][index] / 1000, // Assuming you need to divide by 1000
                ])
                .filter(([timestamp]: number[]) => timestamp <= currentTime), // Filter out future timestamps
            color: currIndex === 0 ? "yellow" : "red", // Different color for in and out
        }),
    );

    {
        /* Temperature Panel Data */
    }

    const checkLine = (data: number[]) => {
        return data.every((index) => data[index] === data[0]);
    };

    const tempPanelChart = [];
    for (let i = 0; i <= 13; i++) {
        const tempData = data?.[`tempPanelData${i}`];
        if (tempData && !checkLine(tempData[1])) {
            tempPanelChart.push({
                name: `Panel ${i}`,
                data: tempData[0]
                    .map((timestamp: number, index: number) => [
                        timestamp,
                        tempData[1][index], // Assuming you need to divide by 1000
                    ])
                    .filter(
                        ([timestamp]: number[]) => timestamp <= currentTime,
                    ), // Filter out future timestamps
                color: `hsl(${i * 30}, 70%, 50%)`, // Different color for each panel
            });
        }
    }

    {
        /* Solar Panel Temperature Data */
    }

    const solarPanelTempData = [
        data?.solarPanelTemp1,
        data?.solarPanelTemp2,
        data?.solarPanelTemp3,
        data?.solarPanelTemp4,
        data?.solarPanelTemp5,
        data?.solarPanelTemp6,
    ].filter((temp) => temp); // Filter out any undefined values
    const solarPanelChartData = solarPanelTempData.map(
        (tempData, panelIndex) => ({
            name: `Solar Panel ${panelIndex + 1}`,
            data: tempData[0]
                .map((timestamp: number, index: number) => [
                    timestamp,
                    tempData[1][index], // Assuming you need to divide by 1000
                ])
                .filter(([timestamp]: number[]) => timestamp <= currentTime), // Filter out future timestamps
            color: `hsl(${panelIndex * 60}, 70%, 50%)`, // Different color for each panel
        }),
    );

    {
        /* Uptime Data */
    }
    const uptimeData = data?.uptime;
    const chartDataUptime = uptimeData[0].map(
        (timestamp: number, index: number) => [
            timestamp,
            parseFloat((uptimeData[1][index] / (3600 * 24 * 7)).toFixed(2)), // Convert seconds to hours
        ],
    );

    const chartConfigs = [
        {
            title: "Battery Voltage",
            yAxisTitle: "Voltage (V)",
            series: [
                {
                    name: "Battery Voltage",
                    data: chartDataVBatt,
                    color: "blue",
                },
            ],
            valueSuffix: " V",
        },
        {
            title: "Battery Current",
            yAxisTitle: "Current (A)",
            series: chartDataIBatt,
            valueSuffix: " A",
        },
        {
            title: "Panel Temperatures",
            yAxisTitle: "Temperature (°C)",
            series: tempPanelChart,
            valueSuffix: " °C",
        },

        {
            title: "Solar Panel Temperatures",
            yAxisTitle: "Temperature (°C)",
            series: solarPanelChartData,
            valueSuffix: " °C",
        },
        {
            title: "Uptime",
            yAxisTitle: "Uptime (weeks)",
            series: [
                { name: "Uptime", data: chartDataUptime, color: "orange" },
            ],
            valueSuffix: " weeks",
        },
    ];

    // Base chart template
    const createChartOptions = (config: any) => ({
        chart: {
            type: "line",
            backgroundColor: "transparent",
            reflow: true,
        },
        title: {
            text: config.title,
            style: {
                color: "#ffffff",
                fontSize: "24px",
            },
        },
        xAxis: {
            type: "datetime",
            labels: {
                style: {
                    color: "#ffffff",
                    fontSize: "14px",
                },
            },
        },
        yAxis: {
            title: {
                text: config.yAxisTitle,
                style: {
                    color: "#ffffff",
                    fontSize: "18px",
                },
            },
            labels: {
                style: {
                    color: "#ffffff",
                    fontSize: "14px",
                },
            },
        },
        series: config.series.map((serie: any) => ({
            ...serie,
            tooltip: {
                valueSuffix: config.valueSuffix,
            },
        })),
        plotOptions: {
            series: {
                marker: { enabled: false },
                lineWidth: 2,
            },
        },
        credits: { enabled: false },
        legend: {
            itemStyle: {
                color: "#ffffff",
                fontSize: "16px",
            },
            itemHoverStyle: {
                color: "#ff0000",
            },
        },
        tooltip: {
            backgroundColor: "#000000",
            style: {
                color: "#ffffff",
                fontSize: "14px",
            },
            borderColor: "#ffffff",
            borderRadius: 5,
        },
    });

    return (
        <div className="flex h-full w-full flex-col items-center justify-center space-y-4 bg-black">
            {chartConfigs.map((config, index) => (
                <div key={index} className="w-full">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={createChartOptions(config)}
                        containerProps={{
                            style: { height: "400px", width: "100%" },
                        }}
                    />
                </div>
            ))}
        </div>
    );
}
