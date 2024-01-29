import Link from "next/link";
import { Button } from "@components/ui/button";
import { cn } from "@/lib/utils";

export default function Hero({
    title,
    description,
    buttonText,
    buttonLink,
    className,
    handleClick,
}: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    className?: string;
    handleClick?: () => void;
}) {
    return (
        <section
            className={cn("w-full py-12 md:py-24 lg:py-32 xl:py-48", className)}
        >
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h1 className=" font-bold tracking-tighter text-6xl">
                            {title}
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-500 text-xl dark:text-gray-400">
                            {description}
                        </p>
                    </div>
                    <div className="space-x-4">
                        <Link href={buttonLink}>
                            <Button onClick={handleClick}>{buttonText}</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
