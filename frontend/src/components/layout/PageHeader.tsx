import React from "react";

/**
 * Renders a page header component.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the header.
 * @returns {JSX.Element} The rendered page header.
 */
function PageHeader({ children }: { children?: React.ReactNode }) {
    return (
        <h1 className="text-center text-5xl font-bold" data-testid="pageHeader">
            {children}
        </h1>
    );
}

/**
 * Renders a subtitle for the page.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered as the subtitle.
 * @returns {React.ReactNode} The rendered subtitle component.
 */
function PageSubtitle({ children }: { children?: React.ReactNode }) {
    return (
        <h2 className="text-gray-400" data-testid="pageSubtitle">
            {children}
        </h2>
    );
}

/**
 * Renders a page header and subtitle component.
 * Wraps both the header and the subtitle to be used together
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the component.
 * @returns {React.ReactNode} The rendered page header and subtitle component.
 */
function PageHeaderAndSubtitle({ children }: { children?: React.ReactNode }) {
    return (
        <div className="mb-4 flex flex-col items-center justify-center gap-3">
            {children}
        </div>
    );
}

export { PageHeader, PageSubtitle, PageHeaderAndSubtitle };
