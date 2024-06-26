import Link from "next/link";
import Image from "next/image";
import { graphql } from "@/lib/tada/graphql";
import { getClient } from "@/lib/ApolloClient";

const STRAPI_URL = process.env.BACKEND_INTERNAL_URL;

/**
 * Retrieves the featured image data from the GraphQL API and renders it on the page.
 * @returns The JSX element representing the featured image component.
 */
export default async function featuredImage() {
    const graphqlData = await getClient().query({
        query: GET_FEATURED_IMAGE,
    });

    const queryAttributes = graphqlData.data.featuredImage?.data?.attributes;
    const title = queryAttributes?.title;
    const description = queryAttributes?.description;
    const featuredImageURL =
        queryAttributes?.featuredImage.data?.attributes?.url;
    const satellite = queryAttributes?.satellite?.data?.attributes;
    const satelliteName = satellite?.name;
    const satelliteSlug = satellite?.slug;

    if (!STRAPI_URL || !featuredImageURL) {
        return null;
    }

    return (
        <div className="mb-16">
            <div className="mt-16 flex flex-col items-center justify-center text-center">
                <div className="prose prose-invert">
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center p-4 text-center">
                <Image
                    alt="Featured Satellite Image"
                    src={STRAPI_URL + featuredImageURL}
                    width={900}
                    height={900}
                    className="bg-black-900 max-w-screen-xxs object-contain sm:max-w-screen-sm md:max-w-screen-md "
                />

                {satelliteName && satelliteSlug ? (
                    <div className="prose prose-invert">
                        <p>
                            Image Taken by{" "}
                            <Link
                                href={`/satellites/${satelliteSlug}`}
                                className="text-primary no-underline hover:underline"
                            >
                                {satelliteName}
                            </Link>
                        </p>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

const GET_FEATURED_IMAGE = graphql(`
    query FeaturedImage {
        featuredImage {
            data {
                attributes {
                    description
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
                                name
                                slug
                            }
                        }
                    }
                    title
                }
            }
        }
    }
`);
