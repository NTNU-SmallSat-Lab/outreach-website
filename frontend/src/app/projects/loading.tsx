import React from "react";

// Assuming the correct import path for the Skeleton component
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    // Create an array with the specified number of satellites
    const skeletons = Array.from({ length: 21 }, (_, index) => (
        <Skeleton key={index} className="flex h-96 w-80 flex-col" />
    ));

    return (
        <div className="flex w-full origin-center flex-col justify-center">
            <Skeleton className="my-10 h-24 w-1/3 self-center" />
            <div className="mx-10 mt-4 flex flex-wrap justify-center gap-4">
                {skeletons}
            </div>
        </div>
    );
}