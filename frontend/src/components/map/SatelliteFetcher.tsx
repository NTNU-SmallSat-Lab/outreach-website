export const runtime = "edge";
import { gql } from "@/__generated__/gql";
import { getClient } from "@/lib/ApolloClient";
import MyGlobe from "./MyGlobe";

// Example Datasources
// eslint-disable-next-line no-unused-vars
const EXAMPLE_DATA_TLE_URL = "../datasets/space-track-leo.txt";
// Hypso 1 data
// eslint-disable-next-line no-unused-vars
const HYPSO1_TLE_URL =
    "https://celestrak.org/NORAD/elements/gp.php?NAME=HYPSO-1&FORMAT=TLE";

const GET_ALL_SATELLITE_URLS = gql(`query AllSatellites {
    satellites {
      data {
        attributes {
          celestrakURL
        }
      }
    }
  }
  `);

export default async function SatelliteFetcher() {
    const graphqlData = await getClient().query({
        query: GET_ALL_SATELLITE_URLS,
    });

    const satelliteUrls = graphqlData?.data?.satellites?.data.map(
        (satEntity) => {
            return satEntity?.attributes?.celestrakURL;
        },
    ) as string[];

    // Fetch every satellite's data
    let responses: Promise<String>[] = [];
    satelliteUrls.forEach((url) => {
        responses.push(fetch(url).then((r) => r.text()));
    });
    // Wait for all the responses to come back
    const data = await Promise.all(responses);

    return <MyGlobe satelliteDatas={data}></MyGlobe>;
}
