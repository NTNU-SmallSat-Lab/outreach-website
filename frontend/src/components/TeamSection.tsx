import { getClient } from "@/lib/ApolloClient";
import { graphql } from "@/tada/graphql";
import Image from "next/image";
import { Button } from "./shadcn/button";

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
            <div className="flex w-full flex-col justify-center bg-black bg-opacity-20 px-8 pt-12 sm:flex-row">
                <div className="flex w-full flex-col p-4 sm:w-2/3">
                    <Image
                        alt={teamAttributes.title || ""}
                        src={imageUrl}
                        width={0}
                        height={0}
                        sizes="100vm"
                        className="max-h-[40vw] w-full object-cover"
                    />
                </div>
                <div className="prose prose-invert mb-12 flex w-full flex-col p-4 text-center sm:w-1/3 sm:text-left">
                    <h1>{teamAttributes.title}</h1>
                    {teamAttributes.text &&
                        teamAttributes.text
                            .split("\n")
                            .map((paragraph, index) => (
                                <p key={index} className="mb-0">
                                    {paragraph}
                                </p>
                            ))}
                    <div className="flex w-full justify-center sm:justify-start">
                        {/* Add this div around the button */}
                        <Button
                            className="mt-8 w-1/2 sm:w-1/3"
                            variant={"default"}
                        >
                            Contact
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
