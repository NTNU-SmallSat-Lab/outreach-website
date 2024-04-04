import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
    return (
        <div className="m-5 flex h-full w-full items-center justify-center">
            <div className="flex w-4/5 flex-col items-center justify-center gap-4 bg-background p-5">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-96 w-full" />
                <Skeleton className="h-96 w-1/2" />
            </div>
        </div>
    );
}
