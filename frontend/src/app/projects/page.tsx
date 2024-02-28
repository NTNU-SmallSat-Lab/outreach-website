export const runtime = "edge";
import { gql } from "@/__generated__/gql";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getClient } from "@/lib/ApolloClient";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import Link from "next/link";
import Image from "next/image";
const HOST_URL = process.env.HOST_URL;

const GET_PROJECTS = gql(`
 query GET_PROJECTS {
    projects(sort: ["publishedAt:desc"]) {
        data {
          id
          attributes {
            title
            article
            satellites {
              data {
                attributes {
                  catalogNumberNORAD
                }
              }
            }
            slug
            coverImage {
              data {
                attributes {
                  url
                }
              }
            }
            updatedAt
            publishedAt
            createdAt
            description
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
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-extrabold ">Our Projects</h1>
            <p className="text-sm text-muted-foreground">
                Information about our various projects are shown here.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
                {graphqlData.data.projects.data.map((project) => {
                    let coverImage =
                        project?.attributes?.coverImage?.data?.attributes?.url;

                    if (HOST_URL && coverImage != undefined) {
                        coverImage = HOST_URL + coverImage;
                    }
                    let content: BlocksContent =
                        project?.attributes?.article ?? [];

                    let text = "";

                    for (const block of content) {
                        if (block.type === "paragraph") {
                            const paragraphBlock = block as {
                                type: "paragraph";
                                children: { type: "text"; text: string }[];
                            };

                            text =
                                paragraphBlock.children[0].text.slice(0, 100) +
                                "...";

                            break;
                        }
                    }
                    return (
                        <Link
                            className="m-1 sm:m-4 hover:transform hover:scale-110 transition-transform duration-300 ease-in-out"
                            href={"/projects/" + project?.attributes?.slug}
                            key={project.id}
                        >
                            <Card className="w-64 md:w-68 lg:w-72 flex flex-col h-full">
                                <CardHeader></CardHeader>
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
                                    <CardTitle className="mb-2 mt-2 text-xl font-bold">
                                        {project?.attributes?.title}
                                    </CardTitle>
                                    <p className="break-words">{text}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
