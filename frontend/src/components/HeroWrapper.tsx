import { getClient } from "@/lib/ApolloClient";
import { graphql } from "@/tada/graphql";
import Hero from "@components/ui/hero";

const STRAPI_URL = process.env.BACKEND_INTERNAL_URL;

const GET_HERO_DATA = graphql(`
    query Query($publicationState: PublicationState) {
        hero(publicationState: $publicationState) {
            data {
                attributes {
                    title
                    text
                    image {
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

export default async function HeroWrapper() {
    const graphqlData = await getClient().query({
        query: GET_HERO_DATA,
    });

    // Check if data is available
    if (
        !graphqlData.data ||
        !graphqlData.data.hero ||
        !graphqlData.data.hero.data
    ) {
        return <></>;
    }

    const heroData = graphqlData.data.hero.data;
    const heroAttributes = heroData.attributes;

    if (!heroAttributes || !heroAttributes.image?.data) {
        return <></>;
    }

    const imageUrl = STRAPI_URL! + heroAttributes.image?.data?.attributes?.url;
    if (!isValidUrl(imageUrl)) {
        return <div>Invalid image URL.</div>;
    }

    return (
        <>
            <div className="flex flex-col items-center px-8 py-12 text-center">
                <div className="prose prose-invert">
                    <Hero
                        title={heroAttributes.title || ""}
                        description={heroAttributes.text || ""}
                        imageUrl={imageUrl}
                    />
                </div>
            </div>
        </>
    );
}

function isValidUrl(urlString: string): boolean {
    try {
        new URL(urlString);
        return true;
    } catch (e) {
        return false;
    }
}
