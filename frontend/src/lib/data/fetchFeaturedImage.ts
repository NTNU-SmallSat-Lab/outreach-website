import { getClient } from "../ApolloClient";
import { graphql } from "@/tada/graphql";

const STRAPI_URL = process.env.BACKEND_INTERNAL_URL;

const GET_FEATURED_IMAGE = graphql(`
    query FeaturedImage {
        featuredImage {
            data {
                attributes {
                    featuredImage {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    satellite {
                        data {
                            attributes {
                                catalogNumberNORAD
                                name
                                slug
                            }
                        }
                    }
                    createdAt
                    updatedAt
                    publishedAt
                }
            }
        }
    }
`);

export default async function fetchFeaturedImage() {
    const graphqlData = await getClient().query({
        query: GET_FEATURED_IMAGE,
    });

    let featuredImageURL =
        graphqlData.data.featuredImage?.data?.attributes?.featuredImage?.data
            ?.attributes?.url;

    if (STRAPI_URL && featuredImageURL != undefined) {
        featuredImageURL = STRAPI_URL + featuredImageURL;
    } else {
        featuredImageURL = "";
    }

    const imageSatelliteName =
        graphqlData.data.featuredImage?.data?.attributes?.satellite?.data
            ?.attributes?.name;
    const imageSatelliteSlug =
        graphqlData.data.featuredImage?.data?.attributes?.satellite?.data
            ?.attributes?.slug;

    return {
        featuredImageURL,
        imageSatelliteName,
        imageSatelliteSlug,
    };
}
