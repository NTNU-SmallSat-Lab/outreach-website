import React from "react";
import { cn } from "@/lib/utils";

export default function ColoredSection({
    children,
    className,
}: {
    children?: React.ReactNode;
    className?: string;
}) {
    return <div className={cn("w-full bg-muted", className)}>{children}</div>;
}
