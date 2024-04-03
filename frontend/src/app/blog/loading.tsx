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
            {/* Full width div, split into three equal portions */}
            <div className="flex flex-col">
                <div className="w-full">
                    <Skeleton></Skeleton>
                </div>
                <div className="w-full">
                    <Skeleton></Skeleton>
                </div>
                <div className="flex flex-row flex-wrap">
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                </div>
            </div>
            <SkeletonHero />
            <SkeletonSection />
            <EmptySection />
        </div>
    );
}
