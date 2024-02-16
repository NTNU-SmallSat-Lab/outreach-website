export const runtime = "edge";
import { gql } from "@/__generated__/gql";
import { getClient } from "@/lib/ApolloClient";
import MyGlobe from "./MyGlobe";

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

    return <MyGlobe satelliteUrls={satelliteUrls}></MyGlobe>;
}
