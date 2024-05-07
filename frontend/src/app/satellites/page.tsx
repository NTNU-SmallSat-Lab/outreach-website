import { getClient } from "@/lib/ApolloClient";
import SatelliteResponsiveTable from "./SatelliteResponsiveTable";
import { graphql } from "@/lib/tada/graphql";

const GET_SATELLITES = graphql(`
    query GET_SATELLITES {
        satellites {
            data {
                id
                attributes {
                    catalogNumberNORAD
                    name
                    slug
                }
            }
        }
    }
`);

export default async function Satellites() {
    try {
        const graphqlData = await getClient().query({
            query: GET_SATELLITES,
        });

        const noNoradIdArray = graphqlData.data.satellites?.data.filter(
            (data) => data.attributes?.catalogNumberNORAD == null,
        );

        return (
            <>
                {/* Table for satellites in orbit */}
                <SatelliteResponsiveTable
                    satellites={graphqlData.data.satellites?.data.filter(
                        (data) => data.attributes?.catalogNumberNORAD !== null,
                    )}
                    inOrbit={true}
                ></SatelliteResponsiveTable>

                <div className="mt-12" />

                {/* Table for satellites not in orbit */}
                {noNoradIdArray != undefined && noNoradIdArray.length > 0 ? (
                    <SatelliteResponsiveTable
                        satellites={graphqlData.data.satellites?.data.filter(
                            (data) =>
                                data.attributes?.catalogNumberNORAD == null,
                        )}
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
