import Link from "next/link";
import { cn } from "@/lib/utils";

function Navbar() {
  return (
    <nav className="flex items-center justify-between p-3 bg-slate-700 text-white w-full">
      <div>
        <Link href="/">
          <p className={cn("transition-colors hover:bg-slate-500 p-3", "cursor-pointer")}>
            Logo
          </p>
        </Link>
      </div>

      <div className="flex items-center flex-grow justify-center gap-10">
        <Link href="/">
          <p className={cn("transition-colors hover:bg-slate-500 p-3", "cursor-pointer")}>
            Page 1
          </p>
        </Link>

        <Link href="/">
          <p className={cn("transition-colors hover:bg-slate-500 p-3", "cursor-pointer")}>
            Page 2
          </p>
        </Link>

        <Link href="/">
          <p className={cn("transition-colors hover:bg-slate-500 p-3", "cursor-pointer")}>
            Page 3
          </p>
        </Link>

        <Link href="/">
          <p className={cn("transition-colors hover:bg-slate-500 p-3", "cursor-pointer")}>
            Page 4
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
