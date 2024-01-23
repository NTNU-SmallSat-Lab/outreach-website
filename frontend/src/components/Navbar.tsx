"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation"

function Navbar() {
  const pathname = usePathname();
  console.log(pathname)
  const getButtonVariant = (path: string) => {
    return pathname === path ? "bg-slate-500" : "";
  }

  return (
    <nav className="flex items-center justify-between p-3 bg-slate-700 text-white w-full">
      <div>
        <Link href="/">
          <p className={cn("transition-colors hover:bg-slate-500 p-3 cursor-pointer", getButtonVariant("/"))}>
            Logo
          </p>
        </Link>
      </div>

      <div className="flex items-center flex-grow justify-center gap-10">
        <Link href="/blog">
          <p className={cn("transition-colors hover:bg-slate-500 p-3 cursor-pointer", getButtonVariant("/blog"))}>
            Blog
          </p>
        </Link>

        <Link href="/projects">
          <p className={cn("transition-colors hover:bg-slate-500 p-3 cursor-pointer", getButtonVariant("/projects"))}>
            Projects
          </p>
        </Link>

        <Link href="/team">
          <p className={cn("transition-colors hover:bg-slate-500 p-3 cursor-pointer", getButtonVariant("/team"))}>
            About
          </p>
        </Link>
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
