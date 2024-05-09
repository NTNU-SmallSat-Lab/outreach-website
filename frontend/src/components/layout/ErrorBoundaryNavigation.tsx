"use client";
import React from "react";

import { ErrorBoundary } from "react-error-boundary";

/**
 * ErrorBoundaryNavigation component wraps its children with an ErrorBoundary component,
 * which catches any errors that occur within its children and displays a fallback UI.
 *
 * @component
 * @param {React.ReactNode} children - The content to be wrapped by the ErrorBoundary component.
 * @returns {JSX.Element} The ErrorBoundaryNavigation component.
 */
export default function ErrorBoundaryNavigation({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ErrorBoundary
            fallback={
                <div className="flex h-[calc(100vh-36px)] items-center justify-center">
                    Something went wrong loading this page.
                </div>
            }
        >
            {children}
        </ErrorBoundary>
    );
}
