"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useSatelliteStore } from "@/lib/store";
import { SatelliteNumber } from "@/lib/store";
import Image from "next/image";

/**
 * This component renders the satellite image, fetching it from a backend service and displaying it.
 */

export default function SatImage({
    STRAPI_URL,
    noradID,
}: {
    STRAPI_URL: string | undefined;
    noradID: number | undefined;
}) {
    const [selectedSatellite] = useSatelliteStore((state) => [
        state.selectedSatellite,
    ]);
    const satNumToEntry = useSatelliteStore((state) => state.satNumToEntry);

    const [satImage, setSatImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getImageUrl = useCallback(
        async (satName: string) => {
            const requestDetails = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    satName: satName,
                }),
            };

            const response = await fetch(
                STRAPI_URL + "/api/slack-images",
                requestDetails,
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.success === false) {
                throw new Error(data.message.error || "Failed to fetch image");
            }
            return data.image;
        },
        [STRAPI_URL],
    );

    useEffect(() => {
        async function fetchSlackImages() {
            try {
                setLoading(true);
                const satName = satNumToEntry[noradID as SatelliteNumber]?.name;
                const imageUrl = await getImageUrl(satName);
                setSatImage(imageUrl ?? null);
            } catch (err) {
                console.error("Error fetching satellite images:", err);
                setError("Failed to load satellite images.");
            } finally {
                setLoading(false);
            }
        }
        fetchSlackImages();
    }, [satImage, noradID, satNumToEntry]);

    if (loading) {
        return <div>Loading satellite image...</div>;
    }
    if (error) {
        return <div className="text-red-500">{error}</div>;
    }
    return satImage ? (
        <div className="flex h-full w-full items-center justify-center bg-black">
            <Image
                key={satImage}
                src={satImage}
                alt="Satellite Image"
                width={1600} // Set according to the aspect ratio of the image
                height={0}
                className="max-h-[600px] max-w-[600px] object-contain p-2"
            />
        </div>
    ) : null;
}
