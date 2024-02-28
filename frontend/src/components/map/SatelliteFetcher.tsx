"use server"
import { gql } from "@/__generated__/gql";
import { getClient } from "@/lib/ApolloClient";

// Dynamic import because of leaflet and globe.gl ssr problem with next.js
import dynamic from "next/dynamic";


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


  interface SatelliteFetcherInterface {
    useExampleData: boolean,
    filterList?: string[],
}

export async function fetchSatelliteData({
    useExampleData,
    filterList = [],
}: SatelliteFetcherInterface): Promise<string> {
    console.log("Yo");
    if (useExampleData) {
        
        
        return exampleData;
    } else {
        let graphqlData;

        if (filterList.length > 0) {
            const filters = {
                satelliteName: {
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

        const satelliteUrls = graphqlData?.data?.satellites?.data.map(satEntity => {
            const celestrakURL = satEntity?.attributes?.celestrakURL;
            return celestrakURL ? celestrakURL.replace(/FORMAT=[^&]*/, "FORMAT=TLE") :
                `https://celestrak.org/NORAD/elements/gp.php?CATNR=${satEntity?.attributes?.catalogNumberNORAD}`;
        }) as string[];

        let responses = satelliteUrls.map(url =>
            fetch(url).then(r => r.ok ? r.text() : Promise.reject("Failed to fetch data from Celestrak"))
        );

        const data = await Promise.all(responses);

        console.log(data);
        

        let combinedSatelliteDatas = data.join("\n");


        return combinedSatelliteDatas;
    }
}
