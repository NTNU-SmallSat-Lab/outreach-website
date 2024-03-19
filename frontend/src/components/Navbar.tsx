"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import type { SVGProps } from "react";

export function IconParkHamburgerButton(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={40}
            height={40}
            viewBox="0 0 48 48"
            {...props}
        >
            <g
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
            >
                <path d="M7.94971 11.9497H39.9497"></path>
                <path d="M7.94971 23.9497H39.9497"></path>
                <path d="M7.94971 35.9497H39.9497"></path>
            </g>
        </svg>
    );
}

export default function Navbar() {
    const pathname = usePathname();
    const getButtonVariant = (path: string) => {
        if (path === pathname) {
            return;
        }
        return "ghost";
    };

    return (
        <nav className="flex w-full items-center justify-between border-b border-x-neutral-600 bg-background p-4 text-foreground">
            <div className="flex-1">
                <Link href="/">
                    <img
                        src="/images/ntnu-white-logo.svg"
                        alt="logo"
                        className="w-64 min-w-64"
                    />
                </Link>
            </div>
            <Drawer>
                <DrawerTrigger className="flex justify-end md:hidden">
                    <IconParkHamburgerButton />
                </DrawerTrigger>
                <DrawerContent>
                    <div className="align-center flex flex-col items-center justify-center gap-8">
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
                        <Link href="/satellites">
                            <Button variant={getButtonVariant("/satellites")}>
                                Satellites
                            </Button>
                        </Link>
                    </div>
                </DrawerContent>
            </Drawer>

            <div className="hidden flex-1 justify-center md:flex">
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
                    <Link href="/satellites">
                        <Button variant={getButtonVariant("/satellites")}>
                            Satellites
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
