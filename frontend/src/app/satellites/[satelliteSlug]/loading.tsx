import React from "react";

import { Skeleton } from "@shadcn/skeleton";

export default function Loading() {
    return (
        <div className="flex w-full origin-center flex-col justify-center gap-4">
            <Skeleton className="align-left h-16 w-1/4" />
            <Skeleton className="h-80 w-full self-center" />
            <Skeleton className="h-96 w-full self-center" />
        </div>
    );
}
