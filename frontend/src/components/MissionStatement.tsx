import fetchMissionStatement from "@/lib/data/fetchMissionStatement";
import Image from "next/image";
import Link from "next/link";

import fetchFeaturedImage from "@/lib/data/fetchFeaturedImage";

export default async function MissionStatement() {
    const missionStatement = await fetchMissionStatement();
    const featuredImage = await fetchFeaturedImage();

    return (
        <div className="flex w-full flex-col justify-center bg-black bg-opacity-50 px-8 pt-12 sm:flex-row">
            <div className="prose prose-invert flex w-full flex-col p-4 text-center sm:w-1/2 sm:text-left">
                <h1>
                    {missionStatement.title
                        ? missionStatement.title
                        : "NTNU SmallSat Lab"}
                </h1>
                <p>
                    {missionStatement.textContent
                        ? missionStatement.textContent
                        : "The NTNU SmallSat Lab is a research group at NTNU"}
                </p>
            </div>

            <div className="flex w-full flex-col items-center justify-center p-4 text-center sm:w-1/2">
                <div className="w-full overflow-hidden">
                    <Image
                        alt="Featured Satellite Image"
                        src={featuredImage.featuredImageURL}
                        layout="responsive"
                        width={0}
                        height={0}
                        objectFit="contain"
                        className="w-full"
                    />
                </div>
                <div className="prose prose-invert p-4">
                    <h2>
                        Image Taken by{" "}
                        <Link
                            href={`/satellites/${featuredImage.imageSatelliteSlug}`}
                            className="text-blue-500 underline"
                        >
                            {featuredImage.imageSatelliteName}
                        </Link>
                    </h2>
                </div>
            </div>
        </div>
    );
}
