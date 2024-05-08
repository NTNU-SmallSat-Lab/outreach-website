import { graphql } from "@/lib/tada/graphql";
import { getClient } from "../ApolloClient";

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

export default async function fetchMissionStatement() {
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
