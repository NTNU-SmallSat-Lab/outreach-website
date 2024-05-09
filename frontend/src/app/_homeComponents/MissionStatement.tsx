import Hero from "./Hero";
import { PagePaddingOnlyHorizontal } from "@/components/layout/PageLayout";

import { graphql } from "@/lib/tada/graphql";
import { getClient } from "@lib/ApolloClient";

const GET_MISSION_STATEMENT = graphql(`
    query HomeMissionStatement {
        homeMissionStatement {
            data {
                attributes {
                    title
                    textContent
                }
            }
        }
    }
`);

async function fetchMissionStatement() {
    const client = getClient(); // Ensure getClient properly typed to return ApolloClient
    const response = await client.query({
        // This ensures that TypeScript expects the right structure
        query: GET_MISSION_STATEMENT,
    });

    const missionStatement =
        response.data.homeMissionStatement?.data?.attributes;

    return {
        title: missionStatement?.title,
        textContent: missionStatement?.textContent,
    };
}

export default async function MissionStatement() {
    const missionStatement = await fetchMissionStatement();

    if (
        !missionStatement ||
        !missionStatement.title ||
        !missionStatement.textContent
    ) {
        return null;
    }

    return (
        <PagePaddingOnlyHorizontal>
            <Hero
                title={missionStatement.title}
                description={missionStatement.textContent}
            ></Hero>
        </PagePaddingOnlyHorizontal>
    );
}
