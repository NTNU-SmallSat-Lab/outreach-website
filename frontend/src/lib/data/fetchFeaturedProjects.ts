import { graphql } from "@/tada/graphql";
import { getClient } from "../ApolloClient";

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
                                content
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
                                content
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
                                content
                            }
                        }
                    }
                }
            }
        }
    }
`);

const STRAPI_URL = process.env.BACKEND_INTERNAL_URL;

export default async function fetchFeaturedProjects() {
    const graphqlData = await getClient().query({
        query: GET_FEATURED_PROJECTS,
    });

    console.log(graphqlData.data.homeFeaturedProjects?.data);

    let title = graphqlData.data.homeFeaturedProjects?.data?.attributes?.title;
    let textContent =
        graphqlData.data.homeFeaturedProjects?.data?.attributes?.textContent;

    // Collect all featured projects into an array
    let featuredProjectsData = [
        graphqlData.data.homeFeaturedProjects?.data?.attributes
            ?.featuredProject1?.data?.attributes,
        graphqlData.data.homeFeaturedProjects?.data?.attributes
            ?.featuredProject2?.data?.attributes,
        graphqlData.data.homeFeaturedProjects?.data?.attributes
            ?.featuredProject3?.data?.attributes,
    ];

    // Map over the array to transform the data into the desired structure
    let featuredProjects = featuredProjectsData.map((project) => {
        console.log(project?.content[0].children[0].text);
        return {
            title: project?.title ?? "",
            content: project?.content[0].children[0].text ?? "",
            imageURL:
                STRAPI_URL +
                (project?.previewImage?.data?.attributes?.url ?? ""),
            projectSlug: project?.slug ?? "",
        };
    });

    return {
        title,
        textContent,
        featuredProjects,
    };
}
