"use client";
import React, { useEffect, useState, useRef } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

export default function HistoricalSolarCycleData() {
    const [historicalSunSpot, setHistoricalSunSpot] = useState<any>(null);
    const [historicalTimestamps, setHistoricalTimestamps] = useState<number[]>(
        [],
    );
    const stockChart = useRef<HighchartsReact.RefObject>(null);

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
    const optionsHistoricalChart = {
        chart: {
            backgroundColor: "transparent",
            reflow: true,
            zoomType: "x", // Enable zooming on the x-axis
        },
        title: {
            margin: 20,
            text: "Solar Cycle Progression - Historical Data",
            style: {
                color: "#ffffff",
                fontSize: "24px",
            },
        },
        xAxis: {
            categories: "datetime",
            title: {
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
                formatter: function (
                    this: Highcharts.AxisLabelsFormatterContextObject,
                ): any {
                    const extremes = this.axis.getExtremes();
                    const zoomLevel = extremes.max - extremes.min; // Get the current zoom range
                    if (zoomLevel <= 18 * 30 * 24 * 3600 * 1000) {
                        // If zoomed in to less than or equal to 1 month
                        return Highcharts.dateFormat(
                            "%b %Y",
                            Number(this.value),
                        ); // Show month and year
                    } else {
                        return Highcharts.dateFormat("%Y", Number(this.value)); // Show only the year
                    }
                },
            },
            tickColor: "#ffffff", // Customize the tick color
            lineColor: "#ffffff", // Customize the axis line color
        },

        yAxis: {
            opposite: false, // Place the y-axis on the right side
            title: {
                text: "Sunspot Number (SSN)",
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
            tickColor: "#ffffff", // Customize the tick color
            lineColor: "#ffffff", // Customize the axis line color
        },

        navigator: {
            enabled: true, // Enable the navigator (zoom scroll bar)
            outlineColor: "#ffffff", // Customize the outline color
            maskFill: "rgba(255, 255, 255, 0.2)", // Customize the mask fill
            handles: {
                backgroundColor: "#ffffff", // Customize the handles
                borderColor: "#000000",
            },
        },
        rangeSelector: {
            enabled: true, // Enable the range selector
            buttonSpacing: 10, // Space between buttons
            buttonTheme: {
                fill: "#333333",
                stroke: "#ffffff",
                "stroke-width": 2, // Border width
                r: 5,
                width: 100, // Explicitly set the button width
                height: 30, // Explicitly set the button height
                style: {
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "bold",
                    whiteSpace: "nowrap", // Prevent text wrapping
                },
                states: {
                    hover: {
                        fill: "#555555", // Background color on hover
                        style: {
                            color: "#ffffff", // Text color on hover
                        },
                    },
                    select: {
                        fill: "#00d3ff", // Background color when selected
                        style: {
                            color: "#000000", // Text color when selected
                        },
                    },
                },
            },
            labelStyle: {
                color: "#ffffff", // Customize the "Zoom" label color
                fontSize: "14px",
            },

            inputEnabled: false, // Disable input fields for date selection
            selected: 0,
            buttons: [
                {
                    type: "custom",
                    text: "Default",
                    events: {
                        click: function () {
                            if (stockChart.current) {
                                const chart = stockChart.current.chart;
                                const now = new Date().getTime(); // Current timestamp
                                const twentyFiveYearsAgo =
                                    new Date().setFullYear(
                                        new Date().getFullYear() - 25,
                                    ); // Timestamp for 25 years ago

                                // Set the x-axis extremes to the last 25 years
                                chart.xAxis[0].setExtremes(
                                    twentyFiveYearsAgo,
                                    now,
                                );
                            }
                        },
                    },
                },
                {
                    type: "all",
                    text: "All",
                },
            ],
        },

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
            enabled: true, // Hide legend for cleaner look
            itemStyle: {
                color: "#ffffff", // Customize legend text color
                fontSize: "14px", // Customize legend text size
            },
            itemHoverStyle: {
                color: "#00d3ff", // Customize legend hover text color
            },
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
            href: "https://www.swpc.noaa.gov/products/solar-cycle-progression",
            style: {
                color: "#ffffff", // Customize credits text color
                fontSize: "12px", // Customize credits text size
                textDecoration: "underline",
            },
        },
    };
    useEffect(() => {
        if (stockChart.current) {
            const chart = stockChart.current.chart;
            const now = new Date().getTime(); // Current timestamp
            const twentyFiveYearsAgo = new Date().setFullYear(
                new Date().getFullYear() - 25,
            ); // Timestamp for 25 years ago

            // Set the x-axis extremes to the last 25 years
            chart.xAxis[0].setExtremes(twentyFiveYearsAgo, now);
        }
    }, [stockChart]);

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
                ref={stockChart}
            />
        </div>
    );
}
