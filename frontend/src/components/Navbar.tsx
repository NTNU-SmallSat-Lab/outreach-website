"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";

export default function Navbar() {
    const dropdownPaths = [
        "/team",
        "/partners",
        "/contact",
        "/positions",
        "/infrastructure",
    ];
    const isPathInDropdown = () => dropdownPaths.includes(pathname);

    const pathname = usePathname();
    const getButtonVariant = (path: string) => {
        if (path === "/about" && isPathInDropdown()) {
            return "secondary";
        }

        return pathname === path ? "secondary" : "ghost";
    };

    const { theme, setTheme } = useTheme();
    const isLightTheme = theme === "light";

    const toggleTheme = () => {
        setTheme(isLightTheme ? "dark" : "light");
    };

    return (
        <nav className="flex items-center justify-between p-4 w-full bg-background border-b border-x-neutral-600 text-foreground">
            <div className="flex-1">
                <Link href="/">
                    <h1 className="text-3xl font-bold flex flex-row">
                        <Icon
                            icon="twemoji:satellite"
                            width="36"
                            height="36"
                            className="mr-2"
                        />
                        <span className="transition duration-300 underline decoration-transparent hover:decoration-white ">
                            SmallSatLab
                        </span>
                    </h1>
                </Link>
            </div>

            <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-8">
                    <Link href="/blog">
                        <Button variant={getButtonVariant("/blog")}>
                            Blog
                        </Button>
                    </Link>

                    <Link href="/projects">
                        <Button variant={getButtonVariant("/projects")}>
                            Projects
                        </Button>
                    </Link>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={getButtonVariant("/about")}>
                                About
                                <Icon
                                    icon="raphael:arrowdown"
                                    className="ml-1 size-5"
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <Link href="/team" passHref>
                                <DropdownMenuItem className="hover:cursor-pointer">
                                    Team
                                </DropdownMenuItem>
                            </Link>
                            <Link href="/partners" passHref>
                                <DropdownMenuItem className="hover:cursor-pointer">
                                    Partners
                                </DropdownMenuItem>
                            </Link>
                            <Link href="/contact" passHref>
                                <DropdownMenuItem className="hover:cursor-pointer">
                                    Contact
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="flex-1 flex justify-end">
                <Button onClick={toggleTheme} variant={"ghost"}>
                    {isLightTheme ? (
                        <Icon
                            icon="material-symbols:dark-mode"
                            width="32"
                            height="32"
                        />
                    ) : (
                        <Icon
                            icon="material-symbols:light-mode"
                            width="32"
                            height="32"
                        />
                    )}
                </Button>
            </div>
        </nav>
    );
}
