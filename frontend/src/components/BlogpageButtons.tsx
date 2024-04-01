"use client";
import { useState } from "react";
import { Button } from "./ui/button";

export default function BlogpageButtons() {
    const [activeButton, setActiveButton] = useState("All Posts");

    return (
        <div className="m-10 flex w-1/3 flex-row items-center justify-center gap-4">
            <Button
                className={`w-1/4 min-w-20 border border-white hover:bg-primary ${activeButton === "All Posts" ? "bg-ntnuBlue" : "bg-transparent"}`}
                onClick={() => setActiveButton("All Posts")}
            >
                All Posts
            </Button>
            <Button
                className={`w-1/4 min-w-20 border border-white hover:bg-primary ${activeButton === "Updates" ? "bg-ntnuBlue" : "bg-transparent"}`}
                onClick={() => setActiveButton("Updates")}
            >
                Updates
            </Button>
            <Button
                className={`w-1/4 min-w-20 border border-white hover:bg-primary ${activeButton === "News" ? "bg-ntnuBlue" : "bg-transparent"}`}
                onClick={() => setActiveButton("News")}
            >
                News
            </Button>
        </div>
    );
}
