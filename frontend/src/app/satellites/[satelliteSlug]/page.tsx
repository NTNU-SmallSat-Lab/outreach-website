import React from "react";
import BlockRendererClient from "@/components/BlockRendererClient";
import fetchSatelliteInfo from "@/lib/data/fetchSatelliteInfo";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import RelatedProjectsAndSatellites from "@/components/RelatedProjectsAndSatellites";
import Map2d from "@/components/2dmap/Map2d";
import SatelliteDataHome from "@/components/satelliteData/SatelliteDataHome";

export interface SatelliteInfo {
    name: string;
    content: BlocksContent;
    relatedProjects?: ProjectOrSatellite[];
}

export interface ProjectOrSatellite {
    id: string;
    title: string;
    previewImage: string;
    slug: string;
    isProject: boolean;
}

export default async function SatelliteInfoPage({
    params,
}: {
    params: { satelliteSlug: string };
}) {
    const satelliteInfo: SatelliteInfo = await fetchSatelliteInfo({
        params: params,
    });

    if (!satelliteInfo) return <div>Loading...</div>;

    return (
        <>
            <div className="flex w-full flex-col items-center ">
                {/* Container for satname, stats and sat image */}
                <div className="flex w-full flex-col bg-gray-600 p-0.5 xl:flex-row">
                    {/* Stats Container */}
                    <div className="z-10 flex w-full flex-col">
                        <div className="bg-black p-5">
                            <h1 className="text-xl font-bold tracking-wide">
                                {satelliteInfo.name}
                            </h1>
                        </div>
                        <div className="mt-0.5">
                            <SatelliteDataHome />
                        </div>
                    </div>

                    {/* Image container */}
                    <div className="z-0 ml-0.5 w-full">
                        <div className="flex h-full w-full items-center justify-center bg-black">
                            <h1>Satellite Image</h1>
                        </div>
                    </div>
                </div>

                {/* Container for map */}
                <div className="mt-6 w-full">
                    <Map2d satName={satelliteInfo.name} />
                </div>

                {/* Container for body content */}
                <div className="mt-6">
                    <BlockRendererClient content={satelliteInfo.content} />
                </div>
            </div>

            {/* Related projects */}
            <div className="mt-8 flex w-full flex-col items-center">
                {satelliteInfo.relatedProjects?.length != 0 ? (
                    <h1 className="mb-1 prose prose-invert lg:prose-xl">Related Projects</h1>
                ) : null}

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
            </div>
        </>
    );
}
