import { PageColoredBackground } from "@/components/PageLayout";
import React from "react";
export default function Layout({ children }: { children: React.ReactNode }) {
    return <PageColoredBackground>{children}</PageColoredBackground>;
}
