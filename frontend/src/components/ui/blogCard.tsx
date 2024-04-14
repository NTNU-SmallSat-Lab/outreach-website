import * as React from "react";

import { cn } from "@/lib/utils";

const BlogCard = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex flex-col rounded border bg-background p-5 text-card-foreground",
            className,
        )}
        {...props}
    />
));
BlogCard.displayName = "BlogCard";

const BlogCardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col gap-2", className)}
        {...props}
    />
));
BlogCardHeader.displayName = "BlogCardHeader";

const BlogCardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "hyphens-auto break-words text-2xl font-semibold",
            className,
        )}
        {...props}
    />
));
BlogCardTitle.displayName = "BlogCardTitle";

const BlogCardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn(className)} {...props} />
));
BlogCardContent.displayName = "BlogCardContent";

const BlogCardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn(className)} {...props} />
));
BlogCardFooter.displayName = "BlogCardFooter";

export {
    BlogCard,
    BlogCardHeader,
    BlogCardFooter,
    BlogCardTitle,
    BlogCardContent,
};
