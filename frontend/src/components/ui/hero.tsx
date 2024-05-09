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
            className={`flex min-h-dvh w-full flex-col items-center justify-center ${className}`}
        >
            <h1 className="mb-4  text-center text-5xl font-bold sm:text-7xl md:text-8xl">
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
