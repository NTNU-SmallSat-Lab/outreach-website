import { getClient } from "@/lib/ApolloClient";
import { gql } from "@/__generated__/gql";
import { SatelliteName, SatelliteNumber } from "../store";

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

interface SatelliteNameAndNum {
    name: SatelliteName;
    num: SatelliteNumber;
}

export default async function fetchSatelliteNamesAndId(): Promise<
    SatelliteNameAndNum[]
> {
    let retsats: SatelliteNameAndNum[] | undefined = undefined;
    try {
        const graphqlData = await getClient().query({
            query: GET_SATELLITE_NAMES_AND_ID,
        });

        const satellites = graphqlData?.data?.satellites?.data?.map(
            (satellite) => ({
                name: satellite.attributes?.name,
                num: Number(satellite.attributes?.catalogNumberNORAD),
            }),
        ) as SatelliteNameAndNum[];

        retsats = satellites;
    } catch (error) {
        console.error("Error fetching satellites from strapi:", error);
    }
    return new Promise((resolve, reject) => {
        if (typeof retsats !== "undefined") {
            resolve(retsats);
        }
        reject("Error fetching satellites from strapi");
    });
}
