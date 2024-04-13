import React from "react";

// Assuming the correct import path for the Skeleton component
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex w-full origin-center flex-col justify-center gap-4">
            <Skeleton className="h-24 w-1/3 self-center" />
            <Skeleton className="h-96 w-2/3 self-center" />
        </div>
    );
}
