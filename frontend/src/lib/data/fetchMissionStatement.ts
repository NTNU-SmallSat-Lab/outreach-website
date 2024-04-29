import { gql } from "@/__generated__/gql";
import { getClient } from "../ApolloClient";

const GET_MISSION_STATEMENT = gql(`
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
