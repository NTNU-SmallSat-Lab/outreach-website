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

export default async function fetchFeaturedProjects() {
    const client = getClient();
    const { data } = await client.query({
        query: GET_FEATURED_PROJECTS,
    });

    return data.homeFeaturedProjects?.data?.attributes;
}
