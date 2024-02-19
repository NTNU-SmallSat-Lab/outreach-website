export const runtime = "edge";
import { gql } from "@/__generated__/gql";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getClient } from "@/lib/ApolloClient";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import Link from "next/link";
import Image from "next/image";
import BlockRendererClient from "@/components/BlockRendererClient";
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

      <div className="flex flex-col gap-4 mt-4 justify-center items-center">
                {graphqlData.data.projects.data.map((project) => {

                    let coverImage =
                        project?.attributes?.coverImage?.data?.attributes?.url;

                    if (HOST_URL && coverImage != undefined) {
                        coverImage = HOST_URL + coverImage;
                    }
                    let content: BlocksContent =
                        project?.attributes?.article ?? [];

                    for (const block of content) {
                        if (block.type === "paragraph") {
                            content = [block];
                            break;
                        }
                    }
                    return (
                        <Card className="w-1/2" key={project.id}>
                            <CardHeader>
                                <CardTitle>
                                    <Link
                                        className="hover:underline"
                                        href={
                                            "/projects/" + project?.attributes?.slug
                                        }
                                    >
                                        {project?.attributes?.title}
                                    </Link>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {coverImage && (
                                    <Image
                                        src={coverImage}
                                        alt={coverImage}
                                        width={500}
                                        height={0} // Set height to 0 to maintain aspect ratio
                                    />
                                )}
                                <BlockRendererClient content={content} />
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
    </div>
  );
}
