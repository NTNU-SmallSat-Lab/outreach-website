import React from "react";
import { cn } from "@/lib/utils";

const ColoredSection = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("w-full bg-muted", className)} {...props} />
));

ColoredSection.displayName = "ColoredSection"; // Add display name

export default ColoredSection;
