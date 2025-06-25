import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// A tiny utility for constructing className strings conditionally.
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface SatAttributes {
    catalogNumberNORAD?: string; // NORAD ID as a string
    missionStatus?: string; // Mission status (e.g., "IN ORBIT")
    massKg?: number; // Mass in kilograms
    launchDate?: string; // Launch date as a string
    historicalOrbitalData?: any[]; // Historical orbital data (adjust type if needed)
    satelliteImage?: {
        data?: {
            attributes?: {
                url?: string; // URL of the satellite image
            };
        };
    };
    projects?: {
        data: {
            attributes: {
                title: string;
                previewImage?: {
                    data?: {
                        attributes?: {
                            url?: string;
                        };
                    };
                };
                slug: string;
            };
            id: string;
        }[];
    };
    name?: string; // Satellite name
    content?: any; // Content (adjust type if needed)
}
