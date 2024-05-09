import { getClient } from "@/lib/ApolloClient";
import { graphql } from "@/lib/tada/graphql";
import Image from "next/image";

const STRAPI_URL = process.env.BACKEND_INTERNAL_URL;

/**
 * Renders the team section of the website.
 * Text and Image is fetched from Strapi
 * Displays them in a flex container, either in a column or row depending on screen size.
 */
export default async function TeamSection() {
    const graphqlData = await getClient().query({
        query: GET_TEAM_DATA,
    });

    // Check if data is available
    if (
        !graphqlData.data ||
        !graphqlData.data.hero ||
        !graphqlData.data.hero.data
    ) {
        return <></>;
    }

    const teamData = graphqlData.data.hero.data;
    const teamAttributes = teamData.attributes;

    if (!teamAttributes || !teamAttributes.image?.data) {
        return <></>;
    }

    const imageUrl = STRAPI_URL! + teamAttributes.image?.data?.attributes?.url;

    return (
        <div className="flex w-full flex-col items-center justify-center bg-black bg-opacity-50 py-12">
            <div className=" flex max-w-6xl flex-col justify-center px-8 md:flex-row md:px-10">
                <div className="flex w-full flex-col p-4">
                    <Image
                        alt={teamAttributes.title || ""}
                        src={imageUrl}
                        width={0}
                        height={0}
                        sizes="100vm"
                        className="w-full object-cover sm:max-h-[50vh]"
                    />
                </div>
                <div className="prose prose-invert flex w-full flex-col p-4 text-center md:text-left">
                    <h1>{teamAttributes.title}</h1>
                    {teamAttributes.text &&
                        teamAttributes.text
                            .split("\n")
                            .map((paragraph, index) => (
                                <p key={index} className="">
                                    {paragraph}
                                </p>
                            ))}
                </div>
            </div>
        </div>
    );
}

const GET_TEAM_DATA = graphql(`
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
