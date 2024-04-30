"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@shadcn/button";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerClose,
} from "@/components/shadcn/drawer";
import Image from "next/image";

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

const iconSize = 30;
const iconStyle = "mx-2";

export function SolarSatelliteLineDuotone(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            className={iconStyle}
            {...props}
        >
            <defs>
                <mask id="solarSatelliteLineDuotone0">
                    <g fill="none">
                        <path
                            stroke="gray"
                            strokeWidth={1.5}
                            d="M20.47 10.918s-1.847-.615-4.31-3.078c-2.462-2.463-3.078-4.31-3.078-4.31"
                        ></path>
                        <path
                            fill="gray"
                            d="M16.69 8.37a.75.75 0 0 0-1.06-1.06zm-15.054.661a.75.75 0 0 0 .728 1.312zm12.022 12.605a.75.75 0 0 0 1.31.728zM4.47 18.47a.75.75 0 1 0 1.06 1.06zm8.248-15.595L1.636 9.03l.728 1.312l11.082-6.157zm7.096 7.679l-6.156 11.082l1.31.728l6.157-11.082zM15.63 7.31L4.47 18.47l1.06 1.06L16.69 8.37z"
                        ></path>
                        <path
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeWidth={1.5}
                            d="M13.082 10.918A5.224 5.224 0 1 0 20.47 3.53a5.224 5.224 0 0 0-7.388 7.388Z"
                        ></path>
                    </g>
                </mask>
            </defs>
            <path
                fill="currentColor"
                d="M0 0h24v24H0z"
                mask="url(#solarSatelliteLineDuotone0)"
            ></path>
        </svg>
    );
}

export function MingcuteEdit4Line(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            className={iconStyle}
            {...props}
        >
            <g fill="none" fillRule="evenodd">
                <path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path>
                <path
                    fill="currentColor"
                    d="M5 2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h3v-2H5V4h12v4h2V4a2 2 0 0 0-2-2zm3 5a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zm7.949 3.811a3 3 0 0 1 4.242 4.243l-5.656 5.657a1 1 0 0 1-.707.293h-2.829a1 1 0 0 1-1-1v-2.829a1 1 0 0 1 .293-.707zm2.828 1.414a1 1 0 0 0-1.414 0l1.414 1.415a1 1 0 0 0 0-1.415m-1.414 2.829l-1.414-1.414l-3.95 3.95v1.414h1.414z"
                ></path>
            </g>
        </svg>
    );
}

export function CodiconGithubProject(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={iconSize}
            height={iconSize}
            viewBox="0 0 16 16"
            className={iconStyle}
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M6 13h1V7h6V6H7V3H6v3H3v1h3z"></path>
                <path d="M2.5 2h11l.5.5v11l-.5.5h-11l-.5-.5v-11zM3 13h10V3H3z"></path>
            </g>
        </svg>
    );
}

export default function Navbar() {
    const pathname = usePathname();
    const getButtonVariant = (path: string) => {
        if (pathname.includes(path)) {
            return;
        }
        return "navbarLink";
    };

    return (
        <nav className="flex w-full items-center justify-between border-b border-x-neutral-600 bg-background p-4 text-foreground">
            <div>
                <Link href="/">
                    <Image
                        width={256}
                        height={70}
                        src="/images/ntnu-white-logo.svg"
                        alt="logo"
                        className="duration-200 hover:opacity-80"
                    />
                </Link>
            </div>
            <Drawer>
                <DrawerTrigger className="flex justify-end md:hidden">
                    <IconParkHamburgerButton />
                </DrawerTrigger>
                <DrawerContent>
                    <div className="flex flex-col">
                        <Link
                            href="/blog"
                            className="py-5 duration-200 hover:bg-primary"
                        >
                            <DrawerClose asChild>
                                <Button variant={"ghost"} className="text-left">
                                    <MingcuteEdit4Line />
                                    Blog
                                </Button>
                            </DrawerClose>
                        </Link>

                        <Link
                            href="/projects"
                            className="py-5 duration-200 hover:bg-primary"
                        >
                            <DrawerClose asChild>
                                <Button variant={"ghost"} className="text-left">
                                    <CodiconGithubProject />
                                    Projects
                                </Button>
                            </DrawerClose>
                        </Link>
                        <Link
                            href="/satellites"
                            className="py-5 duration-200 hover:bg-primary"
                        >
                            <DrawerClose asChild>
                                <Button variant={"ghost"} className="text-left">
                                    <SolarSatelliteLineDuotone />
                                    Satellites
                                </Button>
                            </DrawerClose>
                        </Link>
                    </div>
                </DrawerContent>
            </Drawer>

            <div className="hidden flex-1 justify-end md:flex">
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
