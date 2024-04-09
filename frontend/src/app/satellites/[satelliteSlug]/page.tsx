import React from "react";
import BlockRendererClient from "@/components/BlockRendererClient";
import fetchSatelliteInfo from "@/lib/data/fetchSatelliteInfo";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import RelatedProjectsAndSatellites from "@/components/RelatedProjectsAndSatellites";
import SatelliteDataHome from "@/components/satelliteData/SatelliteDataHome";
import { useSatelliteStore } from "@/lib/store";
import SolarDataComponent from "@/components/SolarActivity/SolarData";
function setSelectedSatelliteSlug(satelliteSlug: string) {
    const setSelectedSatellite =
        useSatelliteStore.getState().setSelectedSatellite;
    setSelectedSatellite(satelliteSlug);
}

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
    setSelectedSatelliteSlug(params.satelliteSlug);
    const satelliteInfo: SatelliteInfo = await fetchSatelliteInfo({
        params: params,
    });

    if (!satelliteInfo) return <div>Loading...</div>;

    return (
        <>
            <SolarDataComponent></SolarDataComponent>

            <div className="flex flex-col items-center">
                <h1 className="mt-4 text-2xl font-bold">
                    {satelliteInfo.name}
                </h1>
                <SatelliteDataHome />
                <BlockRendererClient content={satelliteInfo.content} />
                {satelliteInfo.relatedProjects?.length ? (
                    <h1 className="mb-2 mt-2 text-xl font-bold">
                        Related Projects
                    </h1>
                ) : null}
                <div className="mx-10 mt-4 flex flex-wrap justify-center gap-4 md:justify-start">
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
