import { getClient } from "@/lib/ApolloClient";
import { graphql } from "@/tada/graphql";
import Image from "next/image";

const STRAPI_URL = process.env.BACKEND_INTERNAL_URL;

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

    console.log(teamAttributes.text);

    return (
        <>
            <div className="flex w-full flex-col justify-center bg-black bg-opacity-50 px-8 py-12 sm:flex-row sm:px-52">
                <div className="flex w-full flex-col p-4 sm:w-1/2">
                    <Image
                        alt={teamAttributes.title || ""}
                        src={imageUrl}
                        width={0}
                        height={0}
                        sizes="100vm"
                        className="w-full object-cover sm:max-h-[50vh]"
                    />
                </div>
                <div className="prose prose-invert flex w-full flex-col p-4 text-center sm:w-1/2 sm:text-left">
                    <h1>{teamAttributes.title}</h1>
                    {teamAttributes.text &&
                        teamAttributes.text
                            .split("\n")
                            .map((paragraph, index) => (
                                <p key={index} className="mb-0">
                                    {paragraph}
                                </p>
                            ))}
                </div>
            </div>
        </>
    );
}
