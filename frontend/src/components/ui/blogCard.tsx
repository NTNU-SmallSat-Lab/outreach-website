import * as React from "react";

import { cn } from "@/lib/utils";

const BlogCard = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex flex-col border border-white bg-background p-5 text-card-foreground",
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
    <div ref={ref} className={cn("flex flex-col", className)} {...props} />
));
BlogCardHeader.displayName = "BlogCardHeader";

const BlogCardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn("text-2xl font-semibold", className)}
        {...props}
    />
));
BlogCardTitle.displayName = "BlogCardTitle";

const BlogCardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
));
BlogCardDescription.displayName = "BlogCardDescription";

const BlogCardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("pt-0", className)} {...props} />
));
BlogCardContent.displayName = "BlogCardContent";

const BlogCardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
));
BlogCardFooter.displayName = "BlogCardFooter";

export {
    BlogCard,
    BlogCardHeader,
    BlogCardFooter,
    BlogCardTitle,
    BlogCardDescription,
    BlogCardContent,
};
