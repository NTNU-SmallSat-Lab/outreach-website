import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { cn } from "@/lib/utils";

export default function Loading() {
    return (
        <div>
            {/* Full width div, split into two equal portions */}
            <div className="w-full md:h-[calc(100vh-73px)] flex flex-col-reverse md:flex-row gap-2 p-4">
                {/* Square */}
                <div className="w-full h-full flex flex-col gap-2">
                    <Skeleton className="w-full h-24" />
                    <div className="flex flex-row gap-2">
                        <Skeleton className="w-full h-24" />
                        <Skeleton className="w-full h-24" />
                    </div>
                    <div className="flex flex-row gap-2">
                        <Skeleton className="w-full h-24" />
                        <Skeleton className="w-full h-24" />
                    </div>
                    <div className="flex flex-row gap-2">
                        <Skeleton className="w-full h-24" />
                        <Skeleton className="w-full h-24" />
                    </div>
                    <Skeleton className="w-full h-48" />
                    <Skeleton className="w-full h-48" />
                </div>
                <div className="w-full h-full">
                    {/* Circle */}
                    <Skeleton className="w-full aspect-square rounded-full" />
                </div>
            </div>
            <SkeleteonHero />
            <SkeletonSection />
            <EmptySection />
        </div>
    );
}

function EmptySection({
    children,
    className,
}: {
    children?: React.ReactNode;
    className?: string;
}) {
    return <div className={cn("h-dvh w-full", className)}> {children}</div>;
}

function SkeletonSection() {
    return <Skeleton className="h-dvh w-full" />;
}

function SkeleteonHero() {
    return (
        <div className="w-full py-64">
            <div className="px-4">
                <div className="flex flex-col items-center space-y-4 justify-center">
                    {/* Large Hero Text */}
                    <Skeleton className="h-48 w-2/3" />
                    {/* Small sub text */}
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/3" />
                </div>
            </div>
        </div>
    );
}
