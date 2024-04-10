import React from "react";

function VerticalPagePadding({ children }: { children: React.ReactNode }) {
    return <div className="py-8">{children}</div>;
}

function HorizontalPagePadding({ children }: { children: React.ReactNode }) {
    return <div className="px-8 md:px-10">{children}</div>;
}

function PagePadding({ children }: { children: React.ReactNode }) {
    return (
        <HorizontalPagePadding>
            <VerticalPagePadding>{children}</VerticalPagePadding>
        </HorizontalPagePadding>
    );
}

export { VerticalPagePadding, HorizontalPagePadding, PagePadding };
