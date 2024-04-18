import { gql } from "@/__generated__/gql";
import { getClient } from "@/lib/ApolloClient";
import SatelliteResponsiveTable from "@/components/SatelliteResponsiveTable";

const GET_SATELLITES = gql(`
query GET_SATELLITES {
    satellites {
      data {
        id
        attributes {
          catalogNumberNORAD
          name
          previewImage {
            data {
              attributes {
                url
              }
            }
          }
          missionStatus
          slug
          massKg
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

        return (
            <>
                <SatelliteResponsiveTable
                    satellites={graphqlData.data.satellites?.data}
                ></SatelliteResponsiveTable>
            </>
        );
    } catch (error) {
        console.error("Error fetching satellites:", error);
        return <div>Error fetching satellites</div>;
    }
}
