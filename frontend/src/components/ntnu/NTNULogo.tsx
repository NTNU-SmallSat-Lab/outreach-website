"use client";
import { useTheme } from "next-themes";
import NTNULogoImageHelper from "./NTNULogoImage";

export default function NTNULogo() {
    const { theme } = useTheme();
    return <NTNULogoImageHelper darkMode={theme === "dark"} />;
}
