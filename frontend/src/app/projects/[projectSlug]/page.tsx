import { gql } from "@/__generated__/gql";
import BlockRendererClient from "@/components/BlockRendererClient";
import { getClient } from "@/lib/ApolloClient";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import RelatedProjectsAndSatellites from "@/components/RelatedProjectsAndSatellites";
import { ProjectOrSatellite } from "@/app/satellites/[satelliteSlug]/page";
const STRAPI_URL = process.env.STRAPI_URL;

const GET_PROJECT_BY_SLUG = gql(`
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
              previewImage {
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
}`);

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
        graphqlData.data.projects === null
    ) {
        return <div>Project not found</div>;
    }

    const projects = graphqlData.data.projects?.data[0];
    const content: BlocksContent = projects?.attributes?.content ?? [];

    let projectTitle = projects?.attributes?.slug;

    if (STRAPI_URL && projectTitle != undefined) {
        projectTitle = STRAPI_URL + projectTitle;
    }
    return (
        <div className="flex flex-col items-center gap-4">
            <BlockRendererClient content={content} />
            {graphqlData.data.projects?.data[0].attributes?.satellites?.data
                .length != 0 && (
                <h1 className="mb-2 mt-2 text-xl font-bold">
                    Related Satellites
                </h1>
            )}
            <div className="mx-10 mt-4 flex flex-wrap justify-center gap-4 md:justify-start">
                {graphqlData.data.projects?.data[0].attributes?.satellites?.data.map(
                    (satellite: any) => {
                        const previewImage =
                            satellite?.attributes?.previewImage?.data
                                ?.attributes?.url ?? undefined;
                        const satelliteObject: ProjectOrSatellite = {
                            id: satellite.id,
                            title: satellite.attributes.name,
                            previewImage: previewImage,
                            slug: satellite.attributes.name,
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
        </div>
    );
}
