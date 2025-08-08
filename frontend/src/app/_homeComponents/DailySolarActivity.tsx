import React, { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";

/**
 *
 * This component renders a graph of geomagnetic activity index (Kp) data.
 */

export default function DailySolarActivity() {
    const [dailyKpIndex, setDailyKpIndex] = useState<any>(null);
    const [dailyTimestamps, setDailyTimestamps] = useState<string[]>([]);
    useEffect(() => {
        fetch(
            `https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json`,
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                // The first row is header, skip it
                const formattedData = data.slice(1).map((entry: any) => {
                    const dateObj = new Date(entry[0]);
                    // Format: YYYY-MM-DD HH:MM
                    const formattedDate =
                        dateObj.toISOString().split("T")[0] +
                        " " +
                        dateObj.toISOString().split("T")[1].slice(0, 5);
                    return {
                        date: formattedDate,
                        kp: Number(entry[1]),
                    };
                });
                setDailyTimestamps(
                    formattedData.slice(-20).map((d: any) => d.date),
                );
                setDailyKpIndex(formattedData.slice(-20).map((d: any) => d.kp));
            })
            .catch((error) => {
                console.error("Error fetching Kp index data:", error);
            });
    }, []);

    const optionsDailyCharts = {
        chart: {
            type: "column",
            backgroundColor: "transparent",
            reflow: true,
        },
        title: {
            margin: 20,
            text: "Geomagnetic Activity Index (Kp) - Daily Data",
            style: {
                color: "#ffffff",
                fontSize: "24px",
            },
        },
        xAxis: {
            categories: dailyTimestamps, // Example categories, replace with actual dates
            title: {
                text: "Universal Time (UT)",
                style: {
                    color: "#ffffff",
                    fontSize: "18px",
                },
                margin: 20,
            },
            labels: {
                style: {
                    color: "#ffffff",
                    fontSize: "14px",
                },
            },
        },
        yAxis: {
            title: {
                text: "Kp Index",
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
        series: [
            {
                type: "column",
                data: dailyKpIndex, // Example data, replace with actual Kp index data
                showInLegend: false,
                zones: [
                    { value: 5, color: "green" },
                    { value: 6, color: "yellow" },
                    { value: 7, color: "orange" },
                    { value: 8, color: "darkorange" },
                    { value: 9, color: "red" },
                    { value: 10, color: "darkred" },
                ],
                point: {
                    events: {
                        // eslint-disable-next-line no-unused-vars
                        mouseOver(this: Highcharts.Point) {
                            let groupName = "";
                            if (typeof this.y === "number") {
                                if (this.y < 5) {
                                    groupName = "Quiet";
                                } else if (this.y == 5) {
                                    groupName = "Minor Storm";
                                } else if (this.y == 6) {
                                    groupName = "Moderate Storm";
                                } else if (this.y == 7) {
                                    groupName = "Strong Storm";
                                } else if (this.y == 8) {
                                    groupName = "Severe Storm";
                                } else {
                                    groupName = "Extreme Storm";
                                }
                            }
                            this.series.name = `Geomagnetic Activity Index (Kp) - ${groupName}`;
                        },
                    },
                },
            },
        ],
        legend: {
            enabled: false,
        },
        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 600, // Apply this rule for small screens
                    },
                    chartOptions: {
                        title: {
                            style: {
                                fontSize: "18px",
                            },
                        },
                        xAxis: {
                            labels: {
                                style: {
                                    fontSize: "12px",
                                },
                            },
                        },
                        yAxis: {
                            labels: {
                                style: {
                                    fontSize: "12px",
                                },
                            },
                        },
                    },
                },
            ],
        },
        credits: {
            enabled: true,
            text: "Data Source: NOAA SWPC",
            href: "https://www.swpc.noaa.gov/products/planetary-k-index",
            style: {
                color: "#ffffff", // Customize credits text color
                fontSize: "12px", // Customize credits text size
                textDecoration: "underline",
            },
        },
    };
    const customLegend = [
        { name: "Quiet (Kp < 5)", color: "green" },
        { name: "Minor Storm (Kp = 5)", color: "yellow" },
        { name: "Moderate Storm (Kp = 6)", color: "orange" },
        { name: "Strong Storm (Kp = 7)", color: "darkorange" },
        { name: "Severe Storm (Kp = 8)", color: "red" },
        { name: "Extreme Storm (Kp = 9)", color: "darkred" },
    ];
    return (
        <div className="flex w-full flex-col items-center justify-center text-center">
            <div
                className="mb-8 mt-8 h-[600px] w-full max-w-5xl"
                style={{
                    margin: "20px auto", // Add margin around the chart
                }}
            >
                <HighchartsReact
                    highcharts={Highcharts}
                    options={optionsDailyCharts}
                    containerProps={{ className: "w-full h-full" }}
                />
            </div>
            {/* Custom Legend */}
            <div className="mb-4 flex flex-wrap justify-center gap-4">
                {customLegend.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center text-sm sm:text-base"
                        style={{ color: item.color }}
                    >
                        <span
                            style={{
                                display: "inline-block",
                                width: "12px",
                                height: "12px",
                                backgroundColor: item.color,
                                marginRight: "8px",
                            }}
                        ></span>
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
