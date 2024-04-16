"use client"; // This directive marks the component for client-side execution

import React, { useState, useEffect } from "react";

type LaunchDateCountDownProps = {
    launchDateString: string | undefined;
};

const LaunchDateCountDown: React.FC<LaunchDateCountDownProps> = ({
    launchDateString,
}) => {
    const [displayTime, setDisplayTime] = useState<string[]>([
        "0 days",
        "0 hours",
        "0 minutes",
        "0 seconds",
    ]);
    const [hasLaunched, setHasLaunched] = useState<boolean | undefined>(true);
    const [columns, setColumns] = useState<string>("grid grid-cols-4");

    useEffect(() => {
        if (!launchDateString) return;

        const launchDate = new Date(launchDateString);

        const intervalId = setInterval(() => {
            const now = new Date();
            const differenceReal = launchDate.getTime() - now.getTime();
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

    if (hasLaunched == undefined) {
        return <></>;
    }
    return (
        <>
            <div className="text-grey-400 pt-10 text-center text-4xl tracking-widest">
                {hasLaunched ? (
                    <p>TIME SINCE LAUNCH</p>
                ) : (
                    <p>TIME UNTIL LAUNCH</p>
                )}
            </div>

            <div className="flex justify-center pt-3">
                <hr className="w-32 self-center border-white"></hr>
            </div>

            <div className="pt-5">
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

                <div className="border-b-2 border-gray-600 py-5"></div>
            </div>
        </>
    );
};

export default LaunchDateCountDown;
