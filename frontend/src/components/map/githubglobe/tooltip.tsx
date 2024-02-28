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
                "absolute block z-50 p-2 bg-black bg-opacity-50 rounded-lg shadow-md text-sm",
                className,
            )}
        >
            <div>{children}</div>
        </div>
    ),
);

Tooltip.displayName = "Tooltip"; // Add display name

export default Tooltip;
