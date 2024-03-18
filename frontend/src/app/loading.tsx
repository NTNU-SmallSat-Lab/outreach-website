import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { cn } from "@/lib/utils";

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
                <div className="flex flex-col items-center justify-center space-y-4">
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
