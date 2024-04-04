import { cn } from "@/lib/utils";
import React from "react";

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-muted", className)}
            {...props}
        />
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

function SkeletonHero() {
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

export { Skeleton, EmptySection, SkeletonSection, SkeletonHero };
