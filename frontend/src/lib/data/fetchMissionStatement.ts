import { graphql } from "@/tada/graphql";
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
    const graphqlData = await getClient().query({
        query: GET_MISSION_STATEMENT,
    });

    let title = graphqlData.data.homeMissionStatement?.data?.attributes?.title;
    let textContent =
        graphqlData.data.homeMissionStatement?.data?.attributes?.textContent;

    return {
        title,
        textContent,
    };
}
