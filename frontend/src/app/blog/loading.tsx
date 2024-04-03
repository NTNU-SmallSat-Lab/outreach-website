import {
    EmptySection,
    Skeleton,
    SkeletonHero,
    SkeletonSection,
} from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
    return (
        <div>
            {/* Full width div, split into two equal portions */}
            <div className="flex w-full flex-col-reverse gap-5 p-4 md:h-[calc(100vh-73px)] md:flex-row">
                {/* Square */}
                <div className="flex h-full w-full flex-col gap-2">
                    <div className="flex flex-row gap-2">
                        <Skeleton className="h-24 w-1/2" />
                    </div>
                    <div className="flex flex-row gap-2">
                        <Skeleton className="h-24 w-full" />
                    </div>
                    <div className="flex flex-row gap-2">
                        <Skeleton className="h-24 w-full" />
                    </div>
                </div>
                <div className="flex h-full w-full flex-col gap-2">
                    <div className="flex flex-row gap-2">
                        <Skeleton className="h-24 w-1/2" />
                    </div>
                    <div className="flex flex-row gap-2">
                        <Skeleton className="h-24 w-full" />
                    </div>
                    <div className="flex flex-row gap-2">
                        <Skeleton className="h-24 w-full" />
                    </div>
                </div>
                <div className="flex h-full w-full flex-col gap-2">
                    <div className="flex flex-row gap-2">
                        <Skeleton className="h-24 w-1/2" />
                    </div>
                    <div className="flex flex-row gap-2">
                        <Skeleton className="h-24 w-full" />
                    </div>
                    <div className="flex flex-row gap-2">
                        <Skeleton className="h-24 w-full" />
                    </div>
                </div>
            </div>
            <SkeletonHero />
            <SkeletonSection />
            <EmptySection />
        </div>
    );
}
