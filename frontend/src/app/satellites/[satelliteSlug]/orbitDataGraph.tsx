"use client";

import React, {
    useState,
    useLayoutEffect,
    useRef,
    useCallback,
    useMemo,
} from "react";
import {
    XAxis,
    CartesianGrid,
    Line,
    LineChart,
    Tooltip,
    YAxis,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { LaunchDateCountDownProps } from "./launchDateCountDown";
import ScrollBarThumb, {
    ScrollBarThumbProps,
} from "./_orbitDataGraphComponents/ScrollBarThumb";

type OrbitDataProps = {
    launchDateString: LaunchDateCountDownProps["launchDate"];
    orbitalData: any;
};

type ChartData = {
    epoch: Date;
    inclination: number;
    eccentricity: number;
    semiMajorAxis: number;
};

const OrbitDataGraph: React.FC<OrbitDataProps> = ({
    launchDateString,
    orbitalData,
}) => {
    // href for the svg component, tracking the size of the container
    const svgContainer = useRef<HTMLDivElement>(null);
    const [svgSize, setSvgSize] = useState({ width: 0, height: 200 });
    {
        /* SB use for ScrollBar*/
    }
    const [scrollBarThumbWidth, setSBThumbWidth] = useState(0);
    // scrollBarTimeFrame is how many months the scrollbar thumb represents
    const scrollBarTimeFrame = useRef(0);
    // Chart Data
    const [chartData, setChartData] = useState<ChartData[]>([]);

    // Handling button for zooming in and out of the graph on a time scale
    const launchDate = useMemo(
        () => (launchDateString ? new Date(launchDateString) : new Date()),
        [launchDateString],
    );
    const calculateMonthsDiff = () => {
        const currentDate = new Date();
        return (
            currentDate.getMonth() -
            launchDate.getMonth() +
            12 * (currentDate.getFullYear() - launchDate.getFullYear())
        );
    };

    const months = calculateMonthsDiff();

    const handleZoomClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // We round the width of the scrollbar thumb at one decimal
        const period = e.currentTarget.textContent;
        const regExp = new RegExp("^([1234567890]+)([my])$");
        const match = period?.match(regExp);
        let SBThumbWidth = 0;

        if (period === "All") {
            SBThumbWidth = svgSize.width * 0.8 - 40.5;
            scrollBarTimeFrame.current = months;
            setSBThumbWidth(SBThumbWidth);
        } else {
            const number = match ? parseInt(match[1]) : 0;
            const periodType = match ? match[2] : "";

            if (periodType === "m") {
                scrollBarTimeFrame.current = number;
                SBThumbWidth =
                    Math.round((svgSize.width * 0.8 * number * 10) / months) /
                    10;
                setSBThumbWidth(SBThumbWidth);
            } else if (periodType === "y") {
                scrollBarTimeFrame.current = number * 12;
                SBThumbWidth =
                    Math.round(
                        (svgSize.width * 0.8 * number * 12 * 10) / months,
                    ) / 10;
                setSBThumbWidth(SBThumbWidth);
            }
        }
        // Updating chart due to resizing the scrollbar thumb
        if (svgContainer.current) {
            handleChartScroll(
                svgContainer.current.getBoundingClientRect().x +
                    0.9 * svgContainer.current.getBoundingClientRect().width -
                    20.5 -
                    SBThumbWidth,
                {
                    topLeft:
                        svgContainer.current.getBoundingClientRect().x +
                        svgSize.width * 0.1 +
                        20.5,
                    width: svgSize.width * 0.8 - 40.5,
                    height: 20,
                },
            );
        }
    };

    // Callback function for updating the chart when the scrollbar thumb is moved
    const handleChartScroll = useCallback(
        (
            thumbX: number,
            svgContainerRect: ScrollBarThumbProps["svgContainerRect"],
        ) => {
            // Ratio of the thumb left border position to the svg container width
            const dateRatio =
                (thumbX - svgContainerRect.topLeft) / svgContainerRect.width;
            // Taking the last date of the data period (first date is the launch date)
            const lastDataDate = new Date(
                orbitalData[orbitalData.length - 1].epoch.slice(0, 23) + "Z",
            );
            // Calculating the displayed period in milliseconds
            const displayedPeriodMs =
                lastDataDate.getTime() - launchDate.getTime();
            // Calculating the first and last date of the chart
            const firstChartDate = new Date(
                launchDate.getTime() + displayedPeriodMs * dateRatio,
            );
            const lastChartDate = new Date(firstChartDate);
            lastChartDate.setMonth(
                firstChartDate.getMonth() + scrollBarTimeFrame.current,
            );
            // Filtering the data to display only the data in the selected period
            const filteredData = orbitalData
                .filter((data: any) => {
                    const dataDate = new Date(data.epoch.slice(0, 23) + "Z");
                    return (
                        dataDate >= firstChartDate && dataDate <= lastChartDate
                    );
                })
                .map((data: any) => {
                    return {
                        ...data,
                        semiMajorAxis: data.semiMajorAxis - 6371,
                        epoch: new Date(data.epoch.slice(0, 23) + "Z"),
                    };
                });

            setChartData(filteredData);
        },
        [orbitalData, launchDate, scrollBarTimeFrame, setChartData],
    );

    // Layout effect to track the size of the container and update the svg size
    useLayoutEffect(() => {
        const updateSize = () => {
            if (svgContainer.current) {
                // Update svg container size
                const width = svgContainer.current.offsetWidth;
                setSvgSize((prevSvgSize) => {
                    return { width: width, height: prevSvgSize.height };
                });
                // Initially set the scrollbar thumb width to represent 1/10 of the total period
                !scrollBarTimeFrame.current
                    ? (scrollBarTimeFrame.current = Math.round(months / 10))
                    : null;
                // Setting the scrollbar thumb width
                const newSBThumbWidth =
                    Math.round(
                        (width * 0.8 * scrollBarTimeFrame.current * 10) /
                            months,
                    ) / 10;
                setSBThumbWidth(newSBThumbWidth);
                handleChartScroll(
                    svgContainer.current.getBoundingClientRect().x +
                        0.9 *
                            svgContainer.current.getBoundingClientRect().width -
                        20.5 -
                        newSBThumbWidth,
                    {
                        topLeft:
                            svgContainer.current.getBoundingClientRect().x +
                            width * 0.1 +
                            20.5,
                        width: width * 0.8 - 40.5,
                        height: 20,
                    },
                );
            }
        };
        window.addEventListener("resize", updateSize);
        updateSize();

        return () => window.removeEventListener("resize", updateSize);
    }, [handleChartScroll, months]);

    console.log("orbitalData", orbitalData);

    return (
        <>
            {orbitalData && (
                <div ref={svgContainer} className="flex w-full flex-col">
                    <div className="mb-5 flex">
                        <p>Orbital parameters history (source : </p>
                        <a
                            className="hover:underline"
                            href="https://www.space-track.org/"
                        >
                            Space Track
                        </a>
                        <p>)</p>
                    </div>
                    <div className="zoom-container mb-5 flex items-center">
                        <h2 className="text-grey-400 mx-5 text-2xl">Zoom : </h2>
                        {/* Scrollbar thumb represents the zoom period selected, in case it fits bad we don't display 
              ie. containerSize > SBThumbWidth > 20px */}
                        {Math.round((svgSize.width * 0.8 * 1 * 10) / months) /
                            10 <
                            svgSize.width &&
                            Math.round(
                                (svgSize.width * 0.8 * 1 * 10) / months,
                            ) /
                                10 >
                                20 && (
                                <button
                                    onClick={handleZoomClick}
                                    className="mx-2 h-8 w-10 rounded-lg bg-[#f2f2f2] text-black hover:bg-[#cccccc]"
                                >
                                    1m
                                </button>
                            )}
                        {Math.round((svgSize.width * 0.8 * 3 * 10) / months) /
                            10 <
                            svgSize.width &&
                            Math.round(
                                (svgSize.width * 0.8 * 3 * 10) / months,
                            ) /
                                10 >
                                40 && (
                                <button
                                    onClick={handleZoomClick}
                                    className="mx-2 h-8 w-10 rounded-lg bg-[#f2f2f2] text-black hover:bg-[#cccccc]"
                                >
                                    3m
                                </button>
                            )}
                        {Math.round((svgSize.width * 0.8 * 6 * 10) / months) /
                            10 <
                            svgSize.width &&
                            Math.round(
                                (svgSize.width * 0.8 * 6 * 10) / months,
                            ) /
                                10 >
                                40 && (
                                <button
                                    onClick={handleZoomClick}
                                    className="mx-2 h-8 w-10 rounded-lg bg-[#f2f2f2] text-black hover:bg-[#cccccc]"
                                >
                                    6m
                                </button>
                            )}
                        {Math.round((svgSize.width * 0.8 * 12 * 10) / months) /
                            10 <
                            svgSize.width &&
                            Math.round(
                                (svgSize.width * 0.8 * 12 * 10) / months,
                            ) /
                                10 >
                                40 && (
                                <button
                                    onClick={handleZoomClick}
                                    className="mx-2 h-8 w-10 rounded-lg bg-[#f2f2f2] text-black hover:bg-[#cccccc]"
                                >
                                    1y
                                </button>
                            )}
                        {Math.round(
                            (svgSize.width * 0.8 * 12 * 5 * 10) / months,
                        ) /
                            10 <
                            svgSize.width &&
                            Math.round(
                                (svgSize.width * 0.8 * 12 * 5 * 10) / months,
                            ) /
                                10 >
                                40 && (
                                <button
                                    onClick={handleZoomClick}
                                    className="mx-2 h-8 w-10 rounded-lg bg-[#f2f2f2] text-black hover:bg-[#cccccc]"
                                >
                                    5y
                                </button>
                            )}
                        {Math.round(
                            (svgSize.width * 0.8 * 12 * 10 * 10) / months,
                        ) /
                            10 <
                            svgSize.width &&
                            Math.round(
                                (svgSize.width * 0.8 * 12 * 10 * 10) / months,
                            ) /
                                10 >
                                40 && (
                                <button
                                    onClick={handleZoomClick}
                                    className="mx-2 h-8 w-10 rounded-lg bg-[#f2f2f2] text-black hover:bg-[#cccccc]"
                                >
                                    10y
                                </button>
                            )}
                        {Math.round(
                            (svgSize.width * 0.8 * 12 * 20 * 10) / months,
                        ) /
                            10 <
                            svgSize.width &&
                            Math.round(
                                (svgSize.width * 0.8 * 12 * 20 * 10) / months,
                            ) /
                                10 >
                                40 && (
                                <button
                                    onClick={handleZoomClick}
                                    className="mx-2 h-8 w-10 rounded-lg bg-[#f2f2f2] text-black hover:bg-[#cccccc]"
                                >
                                    20y
                                </button>
                            )}

                        <button
                            onClick={handleZoomClick}
                            className="mx-2 h-8 w-10 rounded-lg bg-[#f2f2f2] text-black hover:bg-[#cccccc]"
                        >
                            All
                        </button>
                    </div>
                    <div className="flex w-full flex-col items-center justify-center">
                        {/* Chart */}
                        <ResponsiveContainer width="100%" height={500}>
                            <LineChart data={chartData}>
                                <Line
                                    name="Inclination (deg)"
                                    type="monotone"
                                    dataKey="inclination"
                                    stroke="#8884d8"
                                    strokeWidth={3}
                                    yAxisId="y-incl"
                                    dot={false}
                                />
                                <Line
                                    name="Eccentricity"
                                    type="monotone"
                                    dataKey="eccentricity"
                                    stroke="#82ca9d"
                                    strokeWidth={3}
                                    yAxisId="y-ecc"
                                    dot={false}
                                />
                                <Line
                                    name="Semi-major Axis (km)"
                                    type="monotone"
                                    dataKey="semiMajorAxis"
                                    stroke="#ff0000"
                                    strokeWidth={3}
                                    yAxisId="y-sma"
                                    dot={false}
                                />
                                <XAxis
                                    dataKey="epoch"
                                    tickFormatter={(date: Date) => {
                                        return new Intl.DateTimeFormat(
                                            "en-US",
                                            { month: "short", day: "numeric" },
                                        ).format(date);
                                    }}
                                    interval={
                                        Math.floor(chartData.length / 6) - 1
                                    }
                                />
                                <YAxis
                                    axisLine={false}
                                    yAxisId="y-incl"
                                    type="number"
                                    domain={[
                                        (dataMin: number) => 0.999 * dataMin,
                                        (dataMax: number) => dataMax * 1.001,
                                    ]}
                                    tick={{ fill: "#8884d8" }}
                                    tickFormatter={(tick: number) =>
                                        tick.toFixed(1)
                                    }
                                    tickLine={false}
                                ></YAxis>
                                <YAxis
                                    axisLine={false}
                                    orientation="right"
                                    yAxisId="y-ecc"
                                    type="number"
                                    domain={[
                                        (dataMin: number) => 0.9 * dataMin,
                                        (dataMax: number) => dataMax * 1.1,
                                    ]}
                                    tick={{ fill: "#82ca9d" }}
                                    tickFormatter={(tick: number) =>
                                        tick.toFixed(4)
                                    }
                                    tickLine={false}
                                ></YAxis>
                                <YAxis
                                    axisLine={false}
                                    yAxisId="y-sma"
                                    type="number"
                                    domain={[
                                        (dataMin: number) => 0.999 * dataMin,
                                        (dataMax: number) => dataMax * 1.001,
                                    ]}
                                    tick={{ fill: "#ff0000" }}
                                    tickFormatter={(tick: number) =>
                                        tick.toFixed(0)
                                    }
                                    tickLine={false}
                                ></YAxis>
                                <CartesianGrid stroke="#ccc" />
                                <Tooltip
                                    labelFormatter={(date: Date) => {
                                        return new Intl.DateTimeFormat(
                                            "en-US",
                                            {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                                hour: "numeric",
                                                minute: "numeric",
                                                second: "numeric",
                                            },
                                        ).format(date);
                                    }}
                                    contentStyle={{ backgroundColor: "black" }}
                                />
                                <Legend />
                            </LineChart>
                        </ResponsiveContainer>
                        <svg className="relative" width="100%" height="100">
                            {/* Scrollbar for time navigation */}

                            <g
                                transform={`translate(${svgSize.width * 0.1}, 50)`}
                                fill="#f2f2f2"
                            >
                                <g>
                                    <rect y="-50" width="80%" height="1" />
                                </g>
                                <rect width="80%" height="20" />
                                {/* Scrollbar left navigation arrow */}
                                <g>
                                    <rect
                                        x="0.5"
                                        y="0.5"
                                        width="19"
                                        height="19"
                                        fill="#e6e6e6"
                                        stroke="#cccccc"
                                        strokeWidth="1"
                                    />
                                    <path
                                        d="M 13 5 L 6 10 L 13 15"
                                        fill="#333333"
                                    />
                                </g>
                                {/* Scrollbar right navigation arrow */}
                                <g
                                    transform={`translate(${svgSize.width * 0.8 - 20}, 0)`}
                                >
                                    <rect
                                        x="0.5"
                                        y="0.5"
                                        width="19"
                                        height="19"
                                        fill="#e6e6e6"
                                        stroke="#cccccc"
                                        strokeWidth="1"
                                    />
                                    <path
                                        d="M 7 5 L 14 10 L 7 15"
                                        fill="#333333"
                                    />
                                </g>
                                {/* Scrollbar thumb */}
                                <ScrollBarThumb
                                    scrollBarThumbWidth={scrollBarThumbWidth}
                                    svgContainerRect={{
                                        topLeft:
                                            (svgContainer.current?.getBoundingClientRect()
                                                ? svgContainer.current?.getBoundingClientRect()
                                                      .x
                                                : 0) +
                                            svgSize.width * 0.1 +
                                            20.5,
                                        width: svgSize.width * 0.8 - 40.5,
                                        height: 20,
                                    }}
                                    handleChartScroll={handleChartScroll}
                                />
                            </g>
                        </svg>
                    </div>
                </div>
            )}
        </>
    );
};

export default OrbitDataGraph;
