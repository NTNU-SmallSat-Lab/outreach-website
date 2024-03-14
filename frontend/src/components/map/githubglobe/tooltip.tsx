import { cn } from "@/lib/utils";
import React from "react";

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
    ({ children, className, ...props }, ref) => (
        <div
            ref={ref}
            {...props}
            className={cn(
                "absolute z-50 block rounded-lg bg-black bg-opacity-50 p-2 text-sm shadow-md",
                className,
            )}
        >
            <div>{children}</div>
        </div>
    ),
);

Tooltip.displayName = "Tooltip"; // Add display name

export default Tooltip;
