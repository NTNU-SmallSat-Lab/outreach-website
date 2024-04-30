import React from "react";
import Image from "next/image";
interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description: string;
    imageUrl: string;
    className?: string;
}

const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
    ({ title, description, imageUrl, className, children, ...props }, ref) => (
        <section ref={ref} {...props} className={`w-full ${className}`}>
            <div className="container px-4 md:px-6">
                <h1>{title}</h1>
                <div className="flex flex-col items-center space-y-4 text-center">
                    <Image
                        alt={title}
                        src={imageUrl}
                        width={0}
                        height={0}
                        sizes="100vm"
                        className="w-[70%] h-auto"
                    />
                    <p className="self-center"> {description}</p>
                    {children}
                </div>
            </div>
        </section>
    ),
);

Hero.displayName = "Hero";

export default Hero;
