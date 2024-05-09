import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SVGProps } from "react";
import * as React from "react";

/**
 * Renders a card component with content.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the card.
 * @param {string} [props.description] - The description of the card.
 * @param {string} props.link - The link associated with the card.
 * @param {string} [props.className] - The CSS classes for the card.
 * @param {string} [props.tag] - The tag associated with the card.
 * @param {string | Date} [props.datePublished] - The date to be shown.
 * @param {string} [props.imageURL] - The URL of the image associated with the card.
 * @returns {React.ReactNode} The rendered card component.
 */
export default function CardWithContent({
    title,
    description,
    link,
    className,
    tag,
    datePublished,
    imageURL,
}: {
    title: string;
    description?: string;
    link: string;
    className?: string;
    tag?: string;
    datePublished?: string | Date;
    imageURL?: string;
}): React.ReactNode {
    function formatDate(date: string | Date) {
        let newDate = new Date(date);
        const options: Intl.DateTimeFormatOptions = {
            month: "long",
            day: "numeric",
            year: "numeric",
        };
        return newDate.toLocaleDateString("en-US", options);
    }
    if (datePublished) {
        datePublished = formatDate(datePublished);
    }

    return (
        <Link
            href={link}
            className="flex  flex-col border bg-background p-5 text-card-foreground hover:border-primary"
            data-testid="blogCardLink"
        >
            <Card className={cn(className, "")}>
                <CardHeader>
                    {imageURL ? (
                        <Image
                            src={imageURL}
                            alt={imageURL}
                            width={500}
                            height={0}
                            className="aspect-video max-h-[250px] w-full object-cover"
                        />
                    ) : (
                        <div className="flex aspect-video max-h-[250px] w-full items-center justify-center">
                            <PlaceholderImage />
                        </div>
                    )}
                    <div className="flex gap-2">
                        {tag ? (
                            <p
                                className="flex items-center rounded-md bg-primary p-2 text-center text-xs text-white"
                                data-testid="articleTag"
                            >
                                {tag}
                            </p>
                        ) : null}

                        <p className="flex w-fit items-center text-center text-xs text-white">
                            {datePublished}
                        </p>
                    </div>
                    <CardTitle data-testid="blogCardTitle">{title}</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-invert break-words">
                    <p>{description}</p>
                </CardContent>
            </Card>
        </Link>
    );
}

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex flex-col bg-background text-card-foreground",
            className,
        )}
        {...props}
    />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col gap-2", className)}
        {...props}
    />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
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
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn(className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn(className)} {...props} />
));
CardFooter.displayName = "CardFooter";

// SVG component for a placeholder image. Looks like a camera.
export function PlaceholderImage(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={60}
            height={60}
            viewBox="0 0 16 16"
            {...props}
        >
            <path
                fill="white"
                d="M6 5a2 2 0 1 1-4 0a2 2 0 0 1 4 0m9-4a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm-3.448 6.134l-3.76 2.769a.5.5 0 0 1-.436.077l-.087-.034l-1.713-.87L1 11.8V14h14V9.751zM15 2H1v8.635l4.28-2.558a.5.5 0 0 1 .389-.054l.094.037l1.684.855l3.813-2.807a.5.5 0 0 1 .52-.045l.079.05L15 8.495z"
            ></path>
        </svg>
    );
}
