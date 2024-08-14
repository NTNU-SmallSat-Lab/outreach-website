import Link from "next/link";
import { Button } from "@components/shadcn/button";
import CardWithContent from "@components/shared/CardWithContent";
import { PagePaddingOnlyHorizontal } from "@/components/layout/PageLayout";
import { graphql } from "@/lib/tada/graphql";
import { getClient } from "@lib/ApolloClient";

const STRAPI_URL = process.env.BACKEND_INTERNAL_URL;

/**
 * Displays the title and text content from Strapi, alongside three featured projects as cards.
 */
export default async function FeaturedProjects() {
    const featuredProjects = await fetchFeaturedProjects();

    const threeProjects = [
        featuredProjects?.featuredProject1,
        featuredProjects?.featuredProject2,
        featuredProjects?.featuredProject3,
    ];

    return (
        <PagePaddingOnlyHorizontal>
            <div className="mb-16 flex w-full flex-col justify-center gap-2">
                <div className="flex w-full flex-col items-center p-4 pt-0 text-center sm:items-start sm:text-left">
                    <div className="prose prose-invert">
                        <h1>
                            {featuredProjects?.title
                                ? featuredProjects.title
                                : "Projects"}
                        </h1>
                        <p className="mb-2">
                            {featuredProjects?.textContent
                                ? featuredProjects.textContent
                                : "Here are some of our projects"}
                        </p>
                    </div>
                </div>
                <div className="mt-8 flex w-full flex-col">
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
                        {threeProjects.map((project, index) => {
                            if (!project?.data?.attributes?.title) {
                                return null;
                            }
                            let previewImage =
                                project?.data?.attributes?.previewImage?.data?.attributes
                                    ?.url;

                            if (STRAPI_URL && previewImage != undefined) {
                                previewImage = STRAPI_URL + previewImage;
                            }
                            return (
                                <CardWithContent
                                    key={index.toString()}
                                    title={project?.data?.attributes?.title}
                                    link={
                                        "/projects/" +
                                        project?.data?.attributes?.slug
                                    }
                                    imageURL={previewImage}
                                ></CardWithContent>
                            );
                        })}
                    </div>
                </div>
                <div className="mt-4 flex flex-col items-center justify-center">
                    <Link href={"/projects"} className="mt-0">
                        <Button className="mt-0">View all projects</Button>
                    </Link>
                </div>
            </div>
        </PagePaddingOnlyHorizontal>
    );
}

const GET_FEATURED_PROJECTS = graphql(`
    query HomeFeaturedProjects {
        homeFeaturedProjects {
            data {
                attributes {
                    title
                    textContent
                    featuredProject1 {
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
                        }
                    }
                    featuredProject2 {
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
                        }
                    }
                    featuredProject3 {
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
                        }
                    }
                }
            }
        }
    }
`);

async function fetchFeaturedProjects() {
    const client = getClient();
    const { data } = await client.query({
        query: GET_FEATURED_PROJECTS,
    });

    return data.homeFeaturedProjects?.data?.attributes;
}
