import React from "react";
import BlockRendererClient from "@/components/shared/BlockRendererClient";
import RelatedProjectsAndSatellites from "@/components/shared/RelatedProjectsAndSatellites";
import Map2d from "@/app/satellites/[satelliteSlug]/_2dmap/Map2d";
import LaunchDateCountDown from "@/app/satellites/[satelliteSlug]/launchDateCountDown";
import {
    PageHeader,
    PageSubtitle,
    PageHeaderAndSubtitle,
} from "@/components/layout/PageHeader";
import { SatelliteNumber } from "@/lib/store";
import { graphql } from "@/lib/tada/graphql";
import { getClient } from "@/lib/ApolloClient";
import OrbitDataGraph from "./orbitDataGraph";
import SatInfo from "./satInfo";
import { SatAttributes } from "@/lib/utils";

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

    // Get the NORAD ID
    let noradId = Number(satAttributes?.catalogNumberNORAD) as SatelliteNumber;

    // Get the satellite image

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

                {/* Container for satellite info*/}
                <SatInfo
                    satAttributes={satAttributes as SatAttributes}
                    STRAPI_URL={STRAPI_URL}
                />

                {/* Container for launch date */}
                {noradId && satAttributes?.launchDate ? (
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
                {noradId && satAttributes?.missionStatus === "IN ORBIT" ? (
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
