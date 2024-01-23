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

function Navbar() {
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

    return (
        <nav className="flex items-center justify-between p-3 bg-slate-700 text-white w-full">
            <div>
                <Link href="/">
                    <Button variant={getButtonVariant("/")}>Logo</Button>
                </Link>
            </div>

            <div className="flex items-center flex-grow justify-center gap-10">
                <Link href="/blog">
                    <Button variant={getButtonVariant("/blog")}>Blog</Button>
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
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <Link href="/team" passHref>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                        </Link>
                        <Link href="/partners" passHref>
                            <DropdownMenuItem>Partners</DropdownMenuItem>
                        </Link>
                        <Link href="/contact" passHref>
                            <DropdownMenuItem>Contact</DropdownMenuItem>
                        </Link>
                        <Link href="/positions" passHref>
                            <DropdownMenuItem>Positions</DropdownMenuItem>
                        </Link>
                        <Link href="/infrastructure" passHref>
                            <DropdownMenuItem>Infrastructure</DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="ml-auto">
                <input
                    type="text"
                    placeholder="Search"
                    className="p-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
                />
            </div>
        </nav>
    );
}

export default Navbar;
