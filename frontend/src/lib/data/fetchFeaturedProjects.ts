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

interface ProjectAttributes {
    title?: string;
    content?: { children: [{ text?: string }] }[];
    previewImage?: {
        data?: {
            attributes?: {
                url?: string;
            };
        };
    };
    slug?: string;
}

interface ProjectDataContainer {
    data?: {
        attributes?: ProjectAttributes;
    };
}

interface HomeFeaturedProjectsAttributes {
    title?: string;
    textContent?: string;
    featuredProject1?: ProjectDataContainer;
    featuredProject2?: ProjectDataContainer;
    featuredProject3?: ProjectDataContainer;
}

interface HomeFeaturedProjectsData {
    data?: {
        attributes?: HomeFeaturedProjectsAttributes;
    };
}

interface GraphqlData {
    homeFeaturedProjects?: HomeFeaturedProjectsData;
}

const STRAPI_URL = process.env.BACKEND_INTERNAL_URL;

export default async function fetchFeaturedProjects() {
    const client = getClient();
    const { data } = await client.query<GraphqlData>({
        query: GET_FEATURED_PROJECTS,
    });

    const homeFeaturedProjects = data.homeFeaturedProjects?.data?.attributes;
    console.log(homeFeaturedProjects);

    const title = homeFeaturedProjects?.title ?? "";
    const textContent = homeFeaturedProjects?.textContent ?? "";

    const featuredProjectsData = [
        homeFeaturedProjects?.featuredProject1?.data?.attributes,
        homeFeaturedProjects?.featuredProject2?.data?.attributes,
        homeFeaturedProjects?.featuredProject3?.data?.attributes,
    ];

    const featuredProjects = featuredProjectsData.map((project) => {
        const content = project?.content?.[0]?.children?.[0]?.text ?? "";
        const imageURL = `${STRAPI_URL}${project?.previewImage?.data?.attributes?.url ?? ""}`;
        const projectSlug = project?.slug ?? "";

        return { title: project?.title ?? "", content, imageURL, projectSlug };
    });

    return { title, textContent, featuredProjects };
}
