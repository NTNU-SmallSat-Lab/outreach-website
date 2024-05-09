import { MetadataRoute } from "next";
import { getClient } from "@lib/ApolloClient";
import { env } from "process";
import { graphql } from "@/lib/tada/graphql";
import { TadaDocumentNode } from "gql.tada";

// Needs to be dynamic as we use the rsc apollo client
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // All routes
    let routes: MetadataRoute.Sitemap = [];

    // Add the homepage
    if (env.OUTWARD_FACING_URL) {
        routes.push({ url: env.OUTWARD_FACING_URL });
    }

    // Add all root routes for blog, projects and satellites
    routes.push({ url: `${env.OUTWARD_FACING_URL}/blog` });
    routes.push({ url: `${env.OUTWARD_FACING_URL}/projects` });
    routes.push({ url: `${env.OUTWARD_FACING_URL}/satellites` });

    // Add the blog posts
    let articleSlugs = await getSlugs(GET_ARTICLE_SLUGS);

    for (let slug of articleSlugs) {
        routes.push({ url: `${env.OUTWARD_FACING_URL}/blog/${slug}` });
    }

    // Add the projects
    let projectSlugs = await getSlugs(GET_PROJECT_SLUGS);
    for (let slug of projectSlugs) {
        routes.push({ url: `${env.OUTWARD_FACING_URL}/projects/${slug}` });
    }

    // Add the satellites
    let satelliteSlugs = await getSlugs(GET_SATELLITE_SLUGS);
    for (let slug of satelliteSlugs) {
        routes.push({ url: `${env.OUTWARD_FACING_URL}/satellites/${slug}` });
    }

    return routes;
}

// Type definitions for the GraphQL queries
interface Inner {
    data: {
        attributes: {
            slug: string;
        } | null;
    }[];
}

// Type guard to check if the object is an Inner object
function isInner(obj: any): obj is Inner {
    if (obj.data && obj.data[0].attributes && obj.data[0].attributes.slug) {
        return true;
    }
    return false;
}

type QueryType = {
    [key: string]: Inner | null;
};

/**
 * Retrieves the slugs from the provided query.
 * @param query - The query to be executed.
 * @returns A promise that resolves to an array of slugs.
 */
async function getSlugs(query: TadaDocumentNode<QueryType>): Promise<string[]> {
    let response = await getClient().query({
        query: query,
    });
    for (let key in response.data) {
        if (isInner(response.data[key])) {
            return extractSlugs(response.data[key]);
        }
    }
    return [];
}

/**
 * Extracts slugs from the provided data.
 * @param datas - The data to extract slugs from.
 * @returns An array of extracted slugs.
 */
function extractSlugs(datas: Inner | null): string[] {
    let data = datas?.data;
    if (typeof data !== "undefined" && data !== null) {
        let filtered = data
            .map((ting) => ting?.attributes?.slug)
            .filter((slug: string | undefined) => slug !== undefined); // Filter out undefined slugs

        return filtered as string[]; // Have to explicitly cast as ts 5.5 isnt out yet. fixed here https://github.com/microsoft/TypeScript/pull/57465#wins
    }
    return [];
}

const GET_ARTICLE_SLUGS = graphql(`
    query GetAllArticleSlugs {
        articles {
            data {
                attributes {
                    slug
                }
            }
        }
    }
`);

const GET_PROJECT_SLUGS = graphql(`
    query GetAllProjectSlugs {
        projects {
            data {
                attributes {
                    slug
                }
            }
        }
    }
`);

const GET_SATELLITE_SLUGS = graphql(`
    query GetAllSatelliteSlugs {
        satellites {
            data {
                attributes {
                    slug
                }
            }
        }
    }
`);
