"use client";
import { useState } from "react";
import { Button } from "../../components/shadcn/button";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * Renders a set of buttons for filtering blog posts.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - The CSS class names for the component.
 * @returns {JSX.Element} The rendered component.
 */
export default function BlogpageButtons({ className }: { className?: string }) {
    const [activeButton, setActiveButton] = useState("All Posts");
    const router = useRouter();
    const page = useSearchParams().get("currentPage");
    const currentPage = parseInt(page ?? "1", 10);

    const handleParameterChange = (tag: string) => {
        setActiveButton(tag);
        if (tag === "All Posts") router.replace(`/blog?page=${currentPage}`);
        else {
            router.replace(`/blog?page=${currentPage}&tag=${tag}`);
        }
    };

    return (
        <div
            className={cn(
                "flex flex-row items-center justify-center gap-4",
                className,
            )}
        >
            <Button
                className={`border border-white hover:bg-primary ${activeButton === "All Posts" ? "bg-primary" : "bg-transparent"}`}
                onClick={() => handleParameterChange("All Posts")}
            >
                All Posts
            </Button>
            <Button
                className={`border border-white hover:bg-primary ${activeButton === "Satellites" ? "bg-primary" : "bg-transparent"}`}
                onClick={() => handleParameterChange("Satellites")}
                data-testid="blogsSatellitesButton"
            >
                Satellites
            </Button>
            <Button
                className={`border border-white hover:bg-primary ${activeButton === "Projects" ? "bg-primary" : "bg-transparent"}`}
                onClick={() => handleParameterChange("Projects")}
            >
                Projects
            </Button>
        </div>
    );
}
