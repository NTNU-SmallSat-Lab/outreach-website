import { getClient } from "@/lib/ApolloClient";
import SatelliteResponsiveTable from "./SatelliteResponsiveTable";
import { graphql } from "@/lib/tada/graphql";
import { ResultOf } from "@/lib/tada/graphql";

const GET_SATELLITES = graphql(`
    query GET_SATELLITES {
        satellites {
            data {
                id
                attributes {
                    catalogNumberNORAD
                    name
                    slug
                    missionStatus
                }
            }
        }
    }
`);

// Type for the result of the GET_SATELLITES query
// Used in SateliteResponsiveTable.tsx
export type SatellitesResult = NonNullable<
    ResultOf<typeof GET_SATELLITES>["satellites"]
>["data"];

/**
 * Renders the Satellites page.
 * This page fetches satellite data from the server and displays it in two tables:
 * one for satellites in orbit and another for satellites not in orbit.
 */
export default async function Satellites() {
    try {
        const graphqlData = await getClient().query({
            query: GET_SATELLITES,
        });

        const noNoradIdArray = graphqlData.data.satellites?.data.filter(
            (data) => data.attributes?.catalogNumberNORAD == null,
        );

        let satellitesInOrbit = graphqlData.data.satellites?.data.filter(
            (data) => data.attributes?.missionStatus === "IN ORBIT",
        );
        let satellitesNotInOrbit = graphqlData.data.satellites?.data.filter(
            (data) => data.attributes?.missionStatus !== "IN ORBIT",
        );

        return (
            <>
                {/* Table for satellites in orbit */}
                <SatelliteResponsiveTable
                    satellites={satellitesInOrbit}
                    inOrbit={true}
                ></SatelliteResponsiveTable>

                <div className="mt-12" />

                {/* Table for satellites not in orbit */}
                {noNoradIdArray != undefined && noNoradIdArray.length > 0 ? (
                    <SatelliteResponsiveTable
                        satellites={satellitesNotInOrbit}
                        inOrbit={false}
                    ></SatelliteResponsiveTable>
                ) : null}
            </>
        );
    } catch (error) {
        console.error("Error fetching satellites from strapi: ", error);
        return <div>Error fetching satellites</div>;
    }
}
