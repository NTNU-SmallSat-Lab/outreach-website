import {
    Skeleton,
    SkeletonHero,
    SkeletonSection,
    EmptySection,
} from "@shadcn/skeleton";
import React from "react";

export default function Loading() {
    return (
        <div>
            {/* Full width div, split into two equal portions */}
            <div className="flex w-full flex-col-reverse gap-2 p-4 md:h-[calc(100vh-73px)] md:flex-row">
                {/* Square */}
                <div className="flex h-full w-full flex-col gap-2">
                    <Skeleton className="h-24 w-full" />
                    <div className="flex flex-row gap-2">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                    <div className="flex flex-row gap-2">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                    <div className="flex flex-row gap-2">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                </div>
                <div className="h-full w-full">
                    {/* Circle */}
                    <Skeleton className="aspect-square w-full rounded-full" />
                </div>
            </div>
            <SkeletonHero />
            <SkeletonSection />
            <EmptySection />
        </div>
    );
}
