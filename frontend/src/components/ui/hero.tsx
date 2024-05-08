import React from "react";
import Image from "next/image";
interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description: string;
    imageUrl?: string;
    className?: string;
}

const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
    ({ title, description, imageUrl, className, children, ...props }, ref) => (
        <div
            ref={ref}
            {...props}
            className={`flex min-h-[calc(100vh-73px)] w-full flex-col items-center justify-center px-4 md:px-6${className}`}
        >
            <h1 className="text-center  text-5xl font-bold sm:text-7xl md:text-8xl">
                {title}
            </h1>
            <div className="prose prose-invert flex flex-col items-center space-y-4 text-center">
                {imageUrl ? (
                    <Image
                        alt={title}
                        src={imageUrl}
                        width={0}
                        height={0}
                        sizes="100vm"
                        className="h-auto w-[70%]"
                    />
                ) : null}
                <p className="self-center"> {description}</p>
                {children}
            </div>
        </div>
    ),
);

Hero.displayName = "Hero";

export default Hero;
