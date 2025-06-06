"use client";
import React, { useState, useEffect } from "react";

export type LaunchDateCountDownProps = {
    launchDate: string | Date | undefined;
    missionStatus: string | undefined | null;
    orbitalData : any;
};

/**
 * Countdown component that displays the time remaining until a launch date or the time since a launch has occurred.
 *
 * @component
 * @param {string} props.launchDate - The launch date in string format.
 * @returns {JSX.Element} - The countdown component.
 */
const LaunchDateCountDown: React.FC<LaunchDateCountDownProps> = ({
    launchDate: launchDateString, missionStatus: status, orbitalData : orbitalData
}) => {
    const [displayTime, setDisplayTime] = useState<string[]>([
        "0 days",
        "0 hours",
        "0 minutes",
        "0 seconds",
    ]);
    const [hasLaunched, setHasLaunched] = useState<boolean | undefined>(true);
    const [columns, setColumns] = useState<string>("grid grid-cols-4");
    const isMissionStatusInOrbit = status === "IN ORBIT";

    useEffect(() => {
        if (!launchDateString) return;

        const launchDate = new Date(launchDateString);
        const intervalId = setInterval(() => {
            const now = new Date();
            const timeForDifference = isMissionStatusInOrbit ? now.getTime() : new Date(orbitalData[orbitalData.length - 1].epoch).getTime();
            const differenceReal = launchDate.getTime() - timeForDifference;
            const difference = Math.abs(differenceReal);

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            let timeParts = [];
            if (days > 0) timeParts.push(`${days} days`);
            if (hours > 0 || timeParts.length > 0)
                timeParts.push(`${hours} hours`);
            if (minutes > 0 || timeParts.length > 0)
                timeParts.push(`${minutes} minutes`);
            timeParts.push(`${seconds} seconds`);

            setDisplayTime(timeParts);
            setHasLaunched(differenceReal <= 0);
            setColumns("grid " + "grid-cols-" + timeParts.length.toString());
        }, 1000);

        return () => clearInterval(intervalId);
    }, [launchDateString]);

    if (hasLaunched == undefined || launchDateString == undefined) {
        return <></>;
    }
    return (
        <>
            <div className="text-grey-400 pt-10 text-center text-4xl tracking-widest">
                {hasLaunched ? (
                    (isMissionStatusInOrbit ? 
                        <p>TIME SINCE LAUNCH</p> 
                        : <p>TIME IN ORBIT</p>)
                ) : 
                    <p>TIME UNTIL LAUNCH</p>
                }
            </div>

            <div className="mt-8 flex justify-center">
                <hr className="w-full max-w-[350px] self-center border-white"></hr>
            </div>

            <div className="mt-4">
                <div className="rounded-lg p-4 text-center text-4xl tracking-widest text-white shadow-md">
                    {displayTime.length > 0 && (
                        <div className="flex justify-center">
                            <div className={columns}>
                                {displayTime.map((part, index) => (
                                    <div key={index} className="px-2">
                                        <p>{part.split(" ")[0]}</p>
                                        <p className="text-sm">
                                            {part.split(" ")[1]}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default LaunchDateCountDown;
