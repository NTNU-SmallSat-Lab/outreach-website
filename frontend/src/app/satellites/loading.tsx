import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
    return (
        <div>
            {/* Full width div, split into three equal portions */}
            <div className="flex w-full origin-center flex-col justify-center">
                <div className="my-10 flex w-full origin-center flex-row flex-wrap justify-center gap-4">
                    <Skeleton className="flex h-96 w-1/4 flex-col " />
                    <Skeleton className="flex h-96 w-1/4 flex-col " />
                    <Skeleton className="flex h-96 w-1/4 flex-col " />
                    <Skeleton className="flex h-96 w-1/4 flex-col " />
                    <Skeleton className="flex h-96 w-1/4 flex-col " />
                    <Skeleton className="flex h-96 w-1/4 flex-col " />
                    <Skeleton className="flex h-96 w-1/4 flex-col " />
                    <Skeleton className="flex h-96 w-1/4 flex-col " />
                    <Skeleton className="flex h-96 w-1/4 flex-col " />
                </div>
            </div>
        </div>
    );
}
