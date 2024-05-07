import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/shadcn/card";
import { getClient } from "@/lib/ApolloClient";
import Link from "next/link";
import Image from "next/image";
import { SlicePreviewText } from "@/components/SlicePreviewText";
import {
    PageHeader,
    PageHeaderAndSubtitle,
    PageSubtitle,
} from "@/components/PageHeader";
import { PlaceholderImage } from "@/components/CardWithContent";
import { graphql } from "@/tada/graphql";
const STRAPI_URL = process.env.BACKEND_INTERNAL_URL;

const GET_PROJECTS = graphql(`
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
    }
`);

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
        <div className="mx-auto w-full max-w-6xl grow bg-opacity-50 px-4 py-8 sm:px-8 md:px-10">
            <div className="flex flex-col items-center justify-center">
                <PageHeaderAndSubtitle>
                    <PageHeader data-testid="projectHeading">
                        Our Projects
                    </PageHeader>
                    <PageSubtitle>
                        Information about our various projects are shown here.
                    </PageSubtitle>
                </PageHeaderAndSubtitle>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {graphqlData.data.projects.data.map((project) => {
                    let previewImage =
                        project?.attributes?.previewImage?.data?.attributes
                            ?.url;

                    if (STRAPI_URL && previewImage != undefined) {
                        previewImage = STRAPI_URL + previewImage;
                    }
                    return (
                        <Link
                            className="h-full sm:m-4"
                            href={"/projects/" + project?.attributes?.slug}
                            key={project.id}
                            data-testid="projectCard"
                        >
                            <Card className="h-full w-full hover:border-primary">
                                <CardHeader></CardHeader>
                                <CardContent>
                                    <div className="w-full">
                                        {previewImage ? (
                                            <Image
                                                className="max-h-full max-w-full object-contain"
                                                src={previewImage}
                                                alt={previewImage}
                                                width={500}
                                                height={0}
                                            />
                                        ) : (
                                            <div className="m-0 flex aspect-video max-h-full max-w-full items-center justify-center object-contain">
                                                <PlaceholderImage />
                                            </div>
                                        )}
                                    </div>
                                    <div className="prose prose-invert">
                                        <CardTitle className="mb-2 mt-6">
                                            {project?.attributes?.title}
                                        </CardTitle>
                                        <p className="break-words">
                                            <span>
                                                {SlicePreviewText(
                                                    project?.attributes
                                                        ?.content ?? [],
                                                )}
                                            </span>
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
