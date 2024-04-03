import React from "react";
import { cn } from "@/lib/utils";

const ColoredSection = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    return (
        <>
            <div
                ref={ref}
                className={cn("w-full bg-black bg-opacity-50", className)}
                {...props}
            />
        </>
    );
});

ColoredSection.displayName = "ColoredSection"; // Add display name

export default ColoredSection;
