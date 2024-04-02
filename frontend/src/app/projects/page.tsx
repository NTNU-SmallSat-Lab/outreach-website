export const runtime = "edge";
import { gql } from "@/__generated__/gql";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getClient } from "@/lib/ApolloClient";
import Link from "next/link";
import Image from "next/image";
import { SlicePreviewText } from "@/components/SlicePreviewText";
const HOST_URL = process.env.HOST_URL;

const GET_PROJECTS = gql(`
 query GET_PROJECTS {
    projects(sort: ["publishedAt:desc"]) {
        data {
          id
          attributes {
            title
            content
            satellites {
              data {
                attributes {
                  catalogNumberNORAD
                }
              }
            }
            slug
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
  }`);

export default async function ProjectsPage() {
    const graphqlData = await getClient().query({
        query: GET_PROJECTS,
    });

    if (
        graphqlData.data === null ||
        graphqlData.data === undefined ||
        graphqlData.data.projects === undefined ||
        graphqlData.data.projects === null
    ) {
        return <div>There are no projects to show.</div>;
    }

    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-extrabold ">Our Projects</h1>
                <p className="text-sm text-muted-foreground">
                    Information about our various projects are shown here.
                </p>
            </div>

            <div className="mx-10 mt-4 flex flex-wrap justify-center gap-4 md:justify-start">
                {graphqlData.data.projects.data.map((project) => {
                    let previewImage =
                        project?.attributes?.previewImage?.data?.attributes
                            ?.url;

                    if (HOST_URL && previewImage != undefined) {
                        previewImage = HOST_URL + previewImage;
                    }
                    return (
                        <Link
                            className="m-1 transition-transform duration-300 ease-in-out hover:scale-110 hover:transform sm:m-4"
                            href={"/projects/" + project?.attributes?.slug}
                            key={project.id}
                        >
                            <Card className="md:w-68 flex h-full w-64 flex-col lg:w-72">
                                <CardHeader></CardHeader>
                                <CardContent>
                                    <div className="h-64">
                                        {previewImage && (
                                            <Image
                                                className="max-h-full max-w-full object-contain"
                                                src={previewImage}
                                                alt={previewImage}
                                                width={500}
                                                height={0}
                                            />
                                        )}
                                    </div>
                                    <CardTitle className="mb-2 mt-2 text-xl font-bold">
                                        {project?.attributes?.title}
                                    </CardTitle>
                                    <p className="break-words">
                                        {SlicePreviewText(
                                            project?.attributes?.content ?? [],
                                        )}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
