"use client";
import HistoricalSolarCycleData from "./HistoricalSolarCycleData";
import DailySolarActivity from "./DailySolarActivity";

/**
 * This component renders the historical solar data page, including daily and historical solar activity charts.
 * It provides an overview of geomagnetic activity and sunspot numbers.
 */

export default function HistorySolarData() {
    return (
        <div className="mt-16 flex h-full flex-col items-center justify-center text-center">
            <div className="prose prose-invert">
                <h1>{"Historical Solar Data"}</h1>
                <p>
                    {
                        "Here is shown the daily and historical Geomagnetic Activity Index (Kp)"
                    }
                </p>
                <p>
                    {"You can find more details on the website of the"}
                    <a
                        href={`https://www.swpc.noaa.gov/communities/space-weather-enthusiasts-dashboard`}
                        target="_blank"
                        className="ml-2 underline"
                    >
                        {"Space Weather Prediction Center."}
                    </a>
                </p>
            </div>
            {/* Daily Chart container */}
            <DailySolarActivity />
            {/* Historical Chart container */}
            <HistoricalSolarCycleData />
        </div>
    );
}
