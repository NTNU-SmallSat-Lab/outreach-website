import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// A tiny utility for constructing className strings conditionally.
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
