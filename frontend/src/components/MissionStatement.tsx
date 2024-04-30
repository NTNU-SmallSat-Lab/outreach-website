import fetchMissionStatement from "@/lib/data/fetchMissionStatement";
import fetchFeaturedImage from "@/lib/data/fetchFeaturedImage";
import Image from "next/image";
import Link from "next/link";
import {
    ReactElement,
    JSXElementConstructor,
    ReactNode,
    ReactPortal,
    PromiseLikeOfReactNode,
    Key,
} from "react";

export default async function MissionStatement() {
    const missionStatement = await fetchMissionStatement();
    const featuredImage = await fetchFeaturedImage();

    return (
        <div className="flex w-full flex-col justify-center bg-black bg-opacity-50 px-8 pt-12 sm:flex-row">
            <div className="prose prose-invert flex w-full flex-col p-4 text-center sm:text-left">
                <h1>
                    {missionStatement.title
                        ? missionStatement.title
                        : "NTNU SmallSat Lab"}
                </h1>
                {/* Splitting textContent into paragraphs */}
                {missionStatement.textContent &&
                    missionStatement.textContent
                        .split("\n")
                        .map(
                            (
                                paragraph:
                                    | string
                                    | number
                                    | boolean
                                    | ReactElement<
                                          any,
                                          string | JSXElementConstructor<any>
                                      >
                                    | Iterable<ReactNode>
                                    | ReactPortal
                                    | PromiseLikeOfReactNode
                                    | null
                                    | undefined,
                                index: Key | null | undefined,
                            ) => (
                                <p key={index} className="mb-0">
                                    {paragraph}
                                </p>
                            ),
                        )}
            </div>

            <div className="flex w-full flex-col items-center justify-center p-4 text-center">
                <div className="w-full overflow-hidden">
                    <Image
                        alt="Featured Satellite Image"
                        src={featuredImage.featuredImageURL}
                        layout="responsive"
                        width={900}
                        height={600}
                        objectFit="contain"
                        className="bg-black-900 w-full"
                    />
                </div>
                <div className="prose prose-invert p-4">
                    <h2>
                        Image Taken by{" "}
                        <Link
                            href={`/satellites/${featuredImage.imageSatelliteSlug}`}
                            className="text-primary no-underline hover:underline"
                        >
                            {featuredImage.imageSatelliteName}
                        </Link>
                    </h2>
                </div>
            </div>
        </div>
    );
}
