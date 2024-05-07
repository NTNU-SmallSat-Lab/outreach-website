import React from "react";

export default function CardGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {children}
        </div>
    );
}
