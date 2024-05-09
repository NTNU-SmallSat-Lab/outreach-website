import React from "react";

/**
 * Renders a grid layout for displaying cards.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the grid.
 * @returns {React.ReactNode} - The rendered CardGrid component.
 */
export default function CardGrid({
    children,
}: {
    children: React.ReactNode;
}): React.ReactNode {
    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {children}
        </div>
    );
}
