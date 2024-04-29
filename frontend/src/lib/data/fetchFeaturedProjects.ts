import { gql } from "@/__generated__/gql";
import { getClient } from "../ApolloClient";

const GET_FEATURED_PROJECTS = gql(`
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

export default async function fetchFeaturedProjects() {
    const graphqlData = await getClient().query({
        query: GET_FEATURED_PROJECTS,
    });

    let title = graphqlData.data.homeFeaturedProjects?.data?.attributes?.title;
    let textContent =
        graphqlData.data.homeFeaturedProjects?.data?.attributes?.textContent;
    let featuredProject1 =
        graphqlData.data.homeFeaturedProjects?.data?.attributes
            ?.featuredProject1?.data?.attributes;
    let featuredProject2 =
        graphqlData.data.homeFeaturedProjects?.data?.attributes
            ?.featuredProject2?.data?.attributes;
    let featuredProject3 =
        graphqlData.data.homeFeaturedProjects?.data?.attributes
            ?.featuredProject3?.data?.attributes;

    return {
        title,
        textContent,
        featuredProject1,
        featuredProject2,
        featuredProject3,
    };
}
