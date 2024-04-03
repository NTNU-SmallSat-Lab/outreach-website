export const runtime = "edge";
import { gql } from "@/__generated__/gql";
import { getClient } from "@/lib/ApolloClient";

// Dynamic import because of leaflet and globe.gl ssr problem with next.js
import dynamic from "next/dynamic";
const MyGlobe = dynamic(() => import("@/components/map/MyGlobe"), {
    ssr: false,
});

// Example Datasources
import { exampleData } from "./exampleSatData";
// Hypso 1 data
// eslint-disable-next-line no-unused-vars
const HYPSO1_TLE_URL =
    "https://celestrak.org/NORAD/elements/gp.php?NAME=HYPSO-1&FORMAT=TLE";

const GET_ALL_SATELLITE_DATA =
    gql(`query Satellites($filters: SatelliteFiltersInput) {
    satellites(filters: $filters) {
      data {
        attributes {
          celestrakURL
          catalogNumberNORAD
        }
      }
    }
  }
  `);

export default async function SatelliteFetcher({
    useExampleData,
    filterList = [],
}: {
    useExampleData: boolean;
    filterList?: string[];
}) {
    // Fetch the data, either from the example file or from strapi then celestrak
    if (useExampleData) {
        return <MyGlobe satelliteDatas={exampleData}></MyGlobe>;
    } else {
        let graphqlData;

        if (filterList.length > 0) {
            const filters = {
                name: {
                    in: filterList,
                },
            };

            graphqlData = await getClient().query({
                query: GET_ALL_SATELLITE_DATA,
                variables: {
                    filters,
                },
            });
        } else {
            graphqlData = await getClient().query({
                query: GET_ALL_SATELLITE_DATA,
            });
        }

        const satelliteUrls = graphqlData?.data?.satellites?.data.map(
            (satEntity: any) => {
                const celestrakURL = satEntity?.attributes?.celestrakURL;
                if (celestrakURL) {
                    return celestrakURL.replace(/FORMAT=[^&]*/, "FORMAT=TLE");
                }
                return (
                    "https://celestrak.org/NORAD/elements/gp.php?CATNR=" +
                    satEntity?.attributes?.catalogNumberNORAD
                );
            },
        ) as string[];

        // Fetch every satellite's data from celestrak
        let responses: Promise<String>[] = [];
        satelliteUrls.forEach((url) => {
            responses.push(
                fetch(url, {
                    next: {
                        revalidate: 10800, // 3 hours
                    },
                }).then((r) => {
                    if (r.ok) {
                        return r.text();
                    }
                    throw new Error("Failed to fetch data from Celestrak");
                }),
            );
        });
        // Wait for all the responses to come back
        const data = await Promise.all(responses);

        console.log(data);

        let combinedSatelliteDatas = data.join("\n");

        return <MyGlobe satelliteDatas={combinedSatelliteDatas}></MyGlobe>;
    }
}
