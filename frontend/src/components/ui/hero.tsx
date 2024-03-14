import Link from "next/link";
import { Button } from "@components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description: string;
    buttonLink: string;
    buttonText: string;
    handleClick: () => void;
    className?: string;
}

const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
    (
        {
            title,
            description,
            buttonLink,
            buttonText,
            handleClick,
            className,
            children,
            ...props
        },
        ref,
    ) => (
        <section
            ref={ref}
            {...props}
            className={cn("w-full py-12 md:py-24 lg:py-32 xl:py-48", className)}
        >
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h1 className=" text-6xl font-bold tracking-tighter">
                            {title}
                        </h1>
                        <p className="mx-auto max-w-[700px] text-xl text-gray-500 dark:text-gray-400">
                            {description}
                        </p>
                    </div>
                    <div className="space-x-4">
                        <Link href={buttonLink}>
                            <Button onClick={handleClick}>{buttonText}</Button>
                        </Link>
                    </div>
                    {children}
                </div>
            </div>
        </section>
    ),
);

Hero.displayName = "Hero"; // Add display name

export default Hero;
