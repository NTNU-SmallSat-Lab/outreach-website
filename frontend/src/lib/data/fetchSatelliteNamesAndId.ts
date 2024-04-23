import { getClient } from "@/lib/ApolloClient";
import { gql } from "@/__generated__/gql";

const GET_SATELLITE_NAMES_AND_ID = gql(`
    query GET_SATELLITE_NAMES_AND_ID {
        satellites {
            data {
                id
                attributes {
                    catalogNumberNORAD
                    name
                }
            }
        }
    }
`);

export default async function fetchSatelliteNamesAndId() {
    try {
        const graphqlData = await getClient().query({
            query: GET_SATELLITE_NAMES_AND_ID,
        });

        const satellites = graphqlData?.data?.satellites?.data?.map(
            (satellite) => ({
                name: satellite.attributes?.name,
                id: satellite.attributes?.catalogNumberNORAD,
            }),
        );

        return satellites;
    } catch (error) {
        console.error("Error fetching satellites from strapi:", error);
    }
}
