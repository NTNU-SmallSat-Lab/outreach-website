import { PagePadding } from "@/components/PagePadding";
import React from "react";
export default function Layout({ children }: { children: React.ReactNode }) {
    return <PagePadding>{children}</PagePadding>;
}
