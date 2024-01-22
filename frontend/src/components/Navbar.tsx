"use client"
import  Link  from "next/link";
import { cn } from "@/lib/utils"

function Navbar() {

  return (
    <nav className="navbar">
            <div className="flex items-center gap-6" >
                <Link href="/" className={cn(
                  "transition-colors hover:text-foreground/80",
          )}>
                    <p>Side1</p>
                </Link>
            </div>

            <ul className="navbar-list">
                <Link href='/'><li className="navbar-item">Side2</li></Link>
            </ul>
            
        </nav>
  )
}

export default Navbar