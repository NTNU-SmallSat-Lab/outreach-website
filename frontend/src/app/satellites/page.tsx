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

       
        

        const satellitesWithNoradID = [
            { name: "Speed", classNames: "px-6", attributeName: "velocity" },
            {
                name: "Altitude",
                classNames: " hidden px-6 lg:table-cell",
                attributeName: "altitude",
            },
            {
                name: "Latitude",
                classNames: "hidden px-6 md:table-cell",
                attributeName: "latitudeDeg",
            },
            {
                name: "Longitude",
                classNames: "hidden px-6 md:table-cell ",
                attributeName: "longitudeDeg",
            },
        ];


        return (
            <>
                <SatelliteResponsiveTable
                    satellites={graphqlData.data.satellites?.data.filter((data) => data.attributes?.catalogNumberNORAD !== null)}
                    columns={satellitesWithNoradID}
                    title="Satellites"
                    description="Here are the satellites we have worked on. Click on them to
                    see more details."
                ></SatelliteResponsiveTable>



<SatelliteResponsiveTable
                    satellites={graphqlData.data.satellites?.data.filter((data) => data.attributes?.catalogNumberNORAD == null)}
                    columns={undefined}
                    title="Satellites not in orbit"
                    description="Here are satellites that are not in orbit."
                ></SatelliteResponsiveTable>




            </>
        );
    } catch (error) {
        console.error("Error fetching satellites:", error);
        return <div>Error fetching satellites</div>;
    }
}
