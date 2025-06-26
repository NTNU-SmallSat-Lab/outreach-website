"use client";
import React, { useEffect, useState } from "react";
import { useSatelliteStore } from "@/lib/store";
import { SatelliteNumber } from "@/lib/store";

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

    const makeTheImagePublic = async (ID: number) => {
        const requestDetails = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileId: ID,
            }),
        };

        const responseUrl = await fetch(
            STRAPI_URL + "/api/slack-shared-url",
            requestDetails,
        );
        if (!responseUrl.ok) {
            throw new Error(`HTTP error! status: ${responseUrl.status}`);
        }
    };

    const createImageUrl = (originalURL: string, fileName: string) => {
        if (originalURL !== undefined) {
            const lastSegment = originalURL.split("/").pop();
            if (!lastSegment) return;
            const arrayInfo = lastSegment.split("-");
            const userTeam = arrayInfo[0];
            const fileId = arrayInfo[1];
            const pubSecret = arrayInfo[2];
            const fileNameLowered = fileName.toLowerCase();
            return `https://files.slack.com/files-pri/${userTeam}-${fileId}/${fileNameLowered}?pub_secret=${pubSecret}`;
        }
    };

    useEffect(() => {
        async function fetchSlackImages() {
            try {
                setLoading(true);
                const response = await fetch(STRAPI_URL + "/api/slack-images");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                interface SlackFile {
                    id: number;
                    name: string;
                    permalink_public: string;
                }

                interface SlackMessage {
                    text: string;
                    files: SlackFile[];
                }

                const rightMessage: SlackMessage | undefined = (
                    data as SlackMessage[]
                ).find((message: SlackMessage) => {
                    if (noradID !== undefined) {
                        const satName: string | undefined =
                            satNumToEntry[noradID as SatelliteNumber]?.name;
                        if (satName && message.text.includes(satName)) {
                            return true;
                        }
                    }
                    return false;
                });

                const rightFile: SlackFile | undefined = rightMessage?.files[0];
                makeTheImagePublic(rightFile?.id as number).catch((err) => {
                    console.error("Error making image public:", err);
                    setError("Failed to make image public.");
                });
                const imageUrl = createImageUrl(
                    rightFile?.permalink_public as string,
                    rightFile?.name as string,
                );
                setSatImage(imageUrl ?? null);
            } catch (err) {
                console.error("Error fetching satellite images:", err);
                setError("Failed to load satellite images.");
            } finally {
                setLoading(false);
            }
        }
        fetchSlackImages();
    }, [satImage, selectedSatellite]);

    if (loading) {
        return <div>Loading satellite image...</div>;
    }
    if (error) {
        return <div className="text-red-500">{error}</div>;
    }
    return satImage ? (
        <div className="flex h-full w-full items-center justify-center bg-black">
            <img
                src={satImage}
                alt="Satellite Image"
                width="100%"
                height="100%"
                className="max-h-[600px] max-w-[600px] object-contain p-2"
            />
        </div>
    ) : null;
}
