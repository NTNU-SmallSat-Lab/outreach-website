"use client";
import React from "react";

import { ErrorBoundary } from "react-error-boundary";

export default function ErrorBoundaryNavigation({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ErrorBoundary
            fallback={
                <div className="h-[calc(100vh-36px)] flex justify-center items-center">
                    Something went wrong loading this page.
                </div>
            }
        >
            {children}
        </ErrorBoundary>
    );
}
