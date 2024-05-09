import BlockRendererClient from "@/components/shared/BlockRendererClient";
import { getClient } from "@/lib/ApolloClient";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import RelatedProjectsAndSatellites from "@/components/shared/RelatedProjectsAndSatellites";
import { ProjectOrSatellite } from "@/app/satellites/[satelliteSlug]/page";
import { graphql } from "@/lib/tada/graphql";
const STRAPI_URL = process.env.BACKEND_INTERNAL_URL;

const GET_PROJECT_BY_SLUG = graphql(`
    query Projects($projectFilters: ProjectFiltersInput) {
        projects(filters: $projectFilters) {
            data {
                attributes {
                    title
                    content
                    satellites {
                        data {
                            id
                            attributes {
                                name
                                slug
                                satelliteImage {
                                    data {
                                        attributes {
                                            url
                                        }
                                    }
                                }
                            }
                        }
                    }
                    slug
                    previewImage {
                        data {
                            id
                            attributes {
                                url
                            }
                        }
                    }
                }
            }
        }
    }
`);

export default async function Page({
    params,
}: {
    params: { projectSlug: string };
}) {
    const graphqlData = await getClient().query({
        query: GET_PROJECT_BY_SLUG,
        variables: {
            projectFilters: {
                slug: { eq: params.projectSlug },
            },
        },
    });

    if (
        graphqlData.data === null ||
        graphqlData.data === undefined ||
        graphqlData.data.projects === undefined ||
        graphqlData.data.projects === null ||
        graphqlData.data.projects.data.length === 0
    ) {
        return <div className="flex justify-center">Project not found</div>;
    }

    const projects = graphqlData.data.projects?.data[0];
    const content: BlocksContent = projects?.attributes
        ?.content as BlocksContent;

    let projectTitle = projects?.attributes?.slug;

    if (STRAPI_URL && projectTitle != undefined) {
        projectTitle = STRAPI_URL + projectTitle;
    }
    return (
        <div className="mt-8 flex flex-col items-center gap-4">
            <BlockRendererClient content={content} />
            {graphqlData.data.projects?.data[0]?.attributes?.satellites?.data
                .length != 0 && (
                <>
                    <div className="prose prose-invert mb-1 lg:prose-xl">
                        <h2>Related Satellites</h2>
                    </div>
                    <div className="mx-10 mt-4 flex flex-wrap justify-center gap-4">
                        {graphqlData.data.projects?.data[0]?.attributes?.satellites?.data.map(
                            (satellite: any) => {
                                const satelliteImage =
                                    satellite?.attributes?.satelliteImage?.data
                                        ?.attributes?.url ?? undefined;
                                const satelliteObject: ProjectOrSatellite = {
                                    id: satellite.id,
                                    title: satellite.attributes.name,
                                    previewImage: satelliteImage,
                                    slug: satellite.attributes.slug,
                                    isProject: false,
                                };
                                return (
                                    <RelatedProjectsAndSatellites
                                        project={satelliteObject}
                                        key={satellite.id}
                                    />
                                );
                            },
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
