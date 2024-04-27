import React from "react";
import BlockRendererClient from "@/components/BlockRendererClient";
import fetchSatelliteInfo from "@/lib/data/fetchSatelliteInfo";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import RelatedProjectsAndSatellites from "@/components/RelatedProjectsAndSatellites";
import Map2d from "@/components/2dmap/Map2d";
import SatelliteDataHome from "@/components/satelliteData/SatelliteDataHome";
import LaunchDateCountDown from "@/components/ui/launchDateCountDown";
import {
    PageHeader,
    PageSubtitle,
    PageHeaderAndSubtitle,
} from "@/components/PageHeader";
import Image from "next/image";
import { SatelliteName, SatelliteNumber } from "@/lib/store";

export interface SatelliteInfo {
    launchDate: string | undefined;
    name: SatelliteName;
    content: BlocksContent;
    relatedProjects?: ProjectOrSatellite[];
    noradId: SatelliteNumber | undefined;
    missionStatus: string | undefined;
    massKg: number | undefined;
    satelliteImage: string | undefined;
}

export interface ProjectOrSatellite {
    id: string;
    title: string;
    previewImage: string;
    slug: string;
    isProject: boolean;
}

const STRAPI_URL = process.env.BACKEND_INTERNAL_URL;

export default async function SatelliteInfoPage({
    params,
}: {
    params: { satelliteSlug: string };
}) {
    const satelliteInfo: SatelliteInfo = await fetchSatelliteInfo({
        params: params,
    });

    if (!satelliteInfo) return <div>Loading...</div>;

    let imageURL = undefined;
    if (STRAPI_URL && satelliteInfo.satelliteImage) {
        imageURL = STRAPI_URL + satelliteInfo.satelliteImage;
    }

    return (
        <>
            <div className="flex flex-col items-center">
                <PageHeaderAndSubtitle>
                    <PageHeader>{satelliteInfo.name}</PageHeader>
                    <PageSubtitle>
                        {satelliteInfo.missionStatus
                            ? "Mission Status: " + satelliteInfo.missionStatus
                            : null}
                    </PageSubtitle>
                </PageHeaderAndSubtitle>

                {/* Container for satname, stats and sat image */}
                {satelliteInfo.noradId ? (
                    <div className="flex w-full flex-col border-2 border-gray-600 xl:flex-row">
                        {/* Stats Container */}
                        <div className="z-10 flex w-full flex-col border-gray-600 xl:border-r-2">
                            <div className="border-b border-gray-600 bg-black p-5">
                                {satelliteInfo.noradId ? (
                                    <div className="flex flex-row">
                                        <p>NORAD ID: </p>
                                        <a
                                            href={`https://www.n2yo.com/satellite/?s=${satelliteInfo.noradId}`}
                                            target="_blank"
                                            className="ml-2 underline"
                                        >
                                            {satelliteInfo.noradId}
                                        </a>
                                    </div>
                                ) : null}
                                <p className="text-gray-400">
                                    {satelliteInfo.massKg
                                        ? "Mass: " +
                                          satelliteInfo.massKg +
                                          " kg"
                                        : null}
                                </p>
                            </div>
                            <div>
                                <SatelliteDataHome />
                            </div>
                        </div>
                        {/* Image container */}
                        <div className="w-full border-t-2 border-gray-600 xl:border-t-0">
                            <div className="flex h-full w-full items-center justify-center bg-black">
                                {imageURL ? (
                                    <Image
                                        src={imageURL}
                                        alt={satelliteInfo.name}
                                        width={1600} // Set according to the aspect ratio of the image
                                        height={0}
                                        layout="responsive"
                                        className="p-2"
                                    />
                                ) : null}
                            </div>
                        </div>
                    </div>
                ) : null}

                {/* Container for launch date */}
                {satelliteInfo.launchDate ? (
                    <div className="w-full">
                        <LaunchDateCountDown
                            launchDateString={satelliteInfo.launchDate}
                        ></LaunchDateCountDown>
                    </div>
                ) : null}

                {/* Container for map */}
                {satelliteInfo.noradId ? (
                    <div className="mt-6 w-full">
                        <Map2d satNum={satelliteInfo.noradId} />
                    </div>
                ) : null}

                {/* Container for body content */}
                <div className="mt-6 px-4 sm:px-0">
                    <BlockRendererClient content={satelliteInfo.content} />
                </div>
            </div>

            {/* Related projects */}
            <div className="mt-8 flex w-full flex-col items-center">
                {satelliteInfo.relatedProjects?.length != 0 ? (
                    <>
                        <div className="prose prose-invert mb-1 lg:prose-xl">
                            <h3>Related Projects</h3>
                        </div>
                        <div className="mx-10 mt-4 flex flex-wrap justify-center gap-4">
                            {satelliteInfo.relatedProjects?.map(
                                (project: ProjectOrSatellite) => (
                                    <RelatedProjectsAndSatellites
                                        project={project}
                                        key={project.id}
                                    />
                                ),
                            )}
                        </div>
                    </>
                ) : null}
            </div>
        </>
    );
}
