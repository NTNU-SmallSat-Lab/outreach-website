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
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

import type { SVGProps } from 'react';

export function IconParkHamburgerButton(props: SVGProps<SVGSVGElement>) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 48 48" {...props}><g fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}><path d="M7.94971 11.9497H39.9497"></path><path d="M7.94971 23.9497H39.9497"></path><path d="M7.94971 35.9497H39.9497"></path></g></svg>);
}

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
            <Drawer>
            <DrawerTrigger  className="sm:hidden flex justify-end"><IconParkHamburgerButton /></DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
            </Drawer>


            <div className="flex-1 justify-center hidden sm:flex">
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
