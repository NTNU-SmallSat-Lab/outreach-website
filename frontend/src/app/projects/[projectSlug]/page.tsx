export const runtime = "edge";
import { gql } from "@/__generated__/gql";
import BlockRendererClient from "@/components/BlockRendererClient";
import { getClient } from "@/lib/ApolloClient";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
const HOST_URL = process.env.HOST_URL;

const GET_PROJECT_BY_SLUG = gql(`
query Projects($projectFilters: ProjectFiltersInput) {
  projects(filters: $projectFilters) {
    data {
      attributes {
        title
        description
        article
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
        coverImage {
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
    const content: BlocksContent = projects?.attributes?.article ?? [];

    let projectTitle = projects?.attributes?.slug;

    if (HOST_URL && projectTitle != undefined) {
        projectTitle = HOST_URL + projectTitle;
    }
    return (
        <div className="flex flex-col items-center gap-4">
            <div className="prose prose-invert w-1/2 lg:prose-xl">
                <BlockRendererClient content={content} />
            </div>
            {graphqlData.data.projects?.data && (
                <h1 className="mb-2 mt-2 text-xl font-bold">
                    Related Satellites
                </h1>
            )}
            <div className="mx-10 mt-4 flex flex-wrap justify-center gap-4 md:justify-start">
                {graphqlData.data.projects?.data[0].attributes?.satellites?.data.map(
                    (satellite) => {
                        let coverImage =
                            satellite.attributes?.previewImage?.data?.attributes
                                ?.url;

                        if (HOST_URL && coverImage != undefined) {
                            coverImage = HOST_URL + coverImage;
                        }
                        return (
                            <Link
                                className="m-1 transition-transform duration-300 ease-in-out hover:scale-110 hover:transform sm:m-4"
                                href={
                                    "/satellites/" + satellite?.attributes?.name
                                }
                                key={satellite.id}
                            >
                                <Card className="md:w-68 flex h-full w-64 flex-col lg:w-72">
                                    <CardHeader>
                                        <CardTitle className="mb-2 mt-2 text-center text-xl font-bold">
                                            {satellite?.attributes?.name}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {coverImage && (
                                            <Image
                                                className="h-36"
                                                src={coverImage}
                                                alt={coverImage}
                                                width={500}
                                                height={0}
                                            />
                                        )}
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    },
                )}
            </div>
        </div>
    );
}
