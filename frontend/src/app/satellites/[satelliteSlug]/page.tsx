import React from "react";
import BlockRendererClient from "@/components/shared/BlockRendererClient";
import RelatedProjectsAndSatellites from "@/components/shared/RelatedProjectsAndSatellites";
import Map2d from "@/app/satellites/[satelliteSlug]/_2dmap/Map2d";
import SatelliteDataHome from "@/components/satelliteData/SatelliteDataHome";
import LaunchDateCountDown from "@/app/satellites/[satelliteSlug]/launchDateCountDown";
import {
    PageHeader,
    PageSubtitle,
    PageHeaderAndSubtitle,
} from "@/components/layout/PageHeader";
import Image from "next/image";
import { SatelliteNumber } from "@/lib/store";
import { graphql } from "@/lib/tada/graphql";
import { getClient } from "@/lib/ApolloClient";
import OrbitDataGraph from "./orbitDataGraph";

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
    const graphqlData = await getClient().query({
        query: GET_SATELLITE_INFO,
        variables: {
            filters: {
                slug: {
                    eq: params.satelliteSlug,
                },
            },
        },
    });

    // Map all related projects
    let relatedProjects: ProjectOrSatellite[] = [];
    graphqlData?.data?.satellites?.data[0]?.attributes?.projects?.data.map(
        (project: any) => {
            relatedProjects.push({
                id: project.id,
                title: project.attributes?.title,
                previewImage:
                    project.attributes?.previewImage?.data?.attributes?.url,
                slug: project.attributes?.slug,
                isProject: true,
            });
        },
    );

    // Get the satellite attributes
    let satAttributes = graphqlData?.data?.satellites?.data[0]?.attributes;

    // If the satellite is not found return a message
    if (!satAttributes?.catalogNumberNORAD) {
        return <div className="flex justify-center">Satellite not found</div>;
    }

    // Get the NORAD ID
    let noradId = Number(satAttributes?.catalogNumberNORAD) as SatelliteNumber;

    // Get the satellite image
    let satelliteImage = satAttributes?.satelliteImage?.data?.attributes?.url;
    let imageURL = undefined;
    if (STRAPI_URL && satelliteImage) {
        imageURL = STRAPI_URL + satelliteImage;
    }

    console.log("satAttributes", satAttributes);

    return (
        <>
            <div className="flex flex-col items-center">
                <PageHeaderAndSubtitle>
                    <PageHeader>{satAttributes?.name}</PageHeader>
                    <PageSubtitle>
                        {satAttributes?.missionStatus
                            ? "Mission Status: " + satAttributes?.missionStatus
                            : null}
                    </PageSubtitle>
                </PageHeaderAndSubtitle>

                {/* Container for satname, stats and sat image */}
                {noradId ? (
                    <div className="flex w-full flex-col border-2 border-gray-600 xl:flex-row">
                        {/* Stats Container */}
                        <div className="z-10 flex w-full flex-col border-gray-600 xl:border-r-2">
                            <div className="border-b border-gray-600 bg-black p-5">
                                {noradId ? (
                                    <div className="flex flex-row">
                                        <p>NORAD ID: </p>
                                        <a
                                            href={`https://www.n2yo.com/satellite/?s=${noradId}`}
                                            target="_blank"
                                            className="ml-2 underline"
                                        >
                                            {noradId}
                                        </a>
                                    </div>
                                ) : null}
                                <p className="text-gray-400">
                                    {satAttributes?.massKg
                                        ? "Mass: " +
                                          satAttributes?.massKg +
                                          " kg"
                                        : null}
                                </p>
                            </div>
                            {satAttributes.missionStatus === "IN ORBIT" ? (
                                <div>
                                    <SatelliteDataHome satelliteNum={noradId} />
                                </div>
                            ) : null}
                        </div>
                        {/* Image container */}
                        <div className="w-full border-t-2 border-gray-600 xl:border-t-0">
                            <div className="flex h-full w-full items-center justify-center bg-black">
                                {imageURL ? (
                                    <Image
                                        src={imageURL}
                                        alt={satAttributes?.name ?? ""}
                                        width={1600} // Set according to the aspect ratio of the image
                                        height={0}
                                        className="p-2"
                                    />
                                ) : null}
                            </div>
                        </div>
                    </div>
                ) : null}

                {/* Container for launch date */}
                {satAttributes?.launchDate ? (
                    <div className="w-full">
                        <LaunchDateCountDown
                            launchDate={satAttributes?.launchDate}
                            missionStatus={satAttributes?.missionStatus ?? ""}
                            orbitalData={
                                satAttributes?.historicalOrbitalData ?? []
                            }
                        ></LaunchDateCountDown>
                    </div>
                ) : null}

                {/* Container for map */}
                {noradId && satAttributes.missionStatus === "IN ORBIT" ? (
                    <div className="mt-6 w-full">
                        <Map2d satNum={noradId} />
                    </div>
                ) : null}

                {/* Container for body content */}
                <div className="mt-6 px-4 sm:px-0">
                    <BlockRendererClient content={satAttributes?.content} />
                </div>
            </div>

            {/* Container for graph of historical orbital data */}
            <div className="mt-8 flex w-full flex-col items-center">
                {noradId ? (
                    satAttributes?.launchDate ? (
                        <OrbitDataGraph
                            launchDateString={satAttributes?.launchDate}
                            orbitalData={satAttributes?.historicalOrbitalData}
                        />
                    ) : null
                ) : null}
            </div>
            {/* Related projects */}
            <div className="mt-8 flex w-full flex-col items-center">
                {relatedProjects?.length != 0 ? (
                    <>
                        <div className="prose prose-invert mb-1 lg:prose-xl">
                            <h3>Related Projects</h3>
                        </div>
                        <div className="mx-10 mt-4 flex flex-wrap justify-center gap-4">
                            {relatedProjects?.map(
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

const GET_SATELLITE_INFO = graphql(`
    query GET_SATELLITE_INFO($filters: SatelliteFiltersInput) {
        satellites(filters: $filters) {
            data {
                id
                attributes {
                    catalogNumberNORAD
                    content
                    name
                    massKg
                    missionStatus
                    historicalOrbitalData
                    satelliteImage {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    projects {
                        data {
                            attributes {
                                title
                                previewImage {
                                    data {
                                        attributes {
                                            url
                                        }
                                    }
                                }
                                slug
                            }
                            id
                        }
                    }
                    launchDate
                }
            }
        }
    }
`);
