import { getClient } from "../ApolloClient";
import Image from "next/image";
import { PlaceholderImage } from "@/components/fullBlogCard";
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

    const imageSatelliteRelation =
        graphqlData.data.featuredImage?.data?.attributes?.satellite?.data
            ?.attributes?.name;

    return (
        <div>
            {featuredImageURL ? (
                <div>
                    <div className="relative h-[300px] w-[300px]">
                        <Image
                            alt="Featured satellite image"
                            src={featuredImageURL}
                            className="m-0"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="">
                        <p>Taken by {imageSatelliteRelation}</p>
                    </div>
                </div>
            ) : (
                <div className="relative flex h-[300px] w-[300px] items-center justify-center object-contain">
                    <PlaceholderImage />
                </div>
            )}
        </div>
    );
}