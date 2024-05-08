import React from "react";

// Used for pages that do not requre a colored transparent background
function PagePadding({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto w-full max-w-6xl px-8 py-8 md:px-10">
            {children}
        </div>
    );
}

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
function PageColoredBackground({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto w-full max-w-6xl grow bg-black bg-opacity-50 px-4 py-8 sm:px-8 md:px-10">
            {children}
        </div>
    );
}

export { PageColoredBackground, PagePadding, PagePaddingOnlyHorizontal };
