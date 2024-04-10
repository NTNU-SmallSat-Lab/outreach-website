import React from "react";

function PageHeader({ children }: { children?: React.ReactNode }) {
    return <h1 className="text-center text-4xl font-bold">{children}</h1>;
}

function PageSubtitle({ children }: { children?: React.ReactNode }) {
    return <h2 className="text-sm text-muted-foreground">{children}</h2>;
}

// Component that wraps both the header and the subtitle to be used together
function PageHeaderAndSubtitle({ children }: { children?: React.ReactNode }) {
    return (
        <div className="mb-4 flex flex-col items-center justify-center gap-3">
            {children}
        </div>
    );
}

export { PageHeader, PageSubtitle, PageHeaderAndSubtitle };
