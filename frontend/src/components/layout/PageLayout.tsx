import React from "react";

/**
 * A component that adds padding to the page content.
 *
 * @param children - The content to be wrapped with padding.
 * @returns The padded page content.
 */
function PagePadding({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto w-full max-w-6xl px-8 py-8 md:px-10">
            {children}
        </div>
    );
}

/**
 * Renders a component with horizontal padding.
 *
 * @param {React.ReactNode} children - The content to be rendered within the component.
 * @returns {React.ReactNode} The component with horizontal padding.
 */
function PagePaddingOnlyHorizontal({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="mx-auto w-full max-w-6xl px-8 md:px-10">{children}</div>
    );
}

// Used for pages that require a colored transparent background
/**
 * Renders a page with a colored background and padding.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the layout.
 * @returns {JSX.Element} The rendered page layout.
 */
function PageColoredBackground({
    children,
}: {
    children: React.ReactNode;
}): React.JSX.Element {
    return (
        <div className="mx-auto w-full max-w-6xl grow bg-black bg-opacity-50 px-4 py-8 sm:px-8 md:px-10">
            {children}
        </div>
    );
}

export { PageColoredBackground, PagePadding, PagePaddingOnlyHorizontal };
