import Link from "next/link";
import { Button } from "@components/ui/button";
import { cn } from "@/lib/utils";

export default function Hero({
    title,
    description,
    buttonText,
    buttonLink,
    className,
}: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    className?: string;
}) {
    return (
        <section
            className={cn("w-full py-12 md:py-24 lg:py-32 xl:py-48", className)}
        >
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                            {title}
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                            {description}
                        </p>
                    </div>
                    <div className="space-x-4">
                        <Link href={buttonLink}>
                            <Button>{buttonText}</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
