import { gql } from "@/__generated__/gql";
import SatelliteStatsTableRow from "@/components/satelliteData/SatelliteStatsTableRow";
import { getClient } from "@/lib/ApolloClient";
const GET_SATELLITES = gql(`
query GET_SATELLITES {
    satellites {
      data {
        id
        attributes {
          celestrakURL
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
            <div className="flex w-full flex-col items-center justify-center">
                <h1 className="my-10 text-4xl font-extrabold  text-white">
                    Satellites
                </h1>
                <table className="w-4/5 table-auto border-collapse rounded-md border-b border-white shadow">
                    <thead>
                        <tr className="border-y border-white px-3 py-2 text-left text-white">
                            <th className="px-6">Satellite</th>
                            <th className="px-6">Speed</th>
                            <th className="px-6">Altitude</th>
                            <th className="px-6">Latitude</th>
                            <th className="px-6">Longitude</th>
                        </tr>
                    </thead>
                    <tbody>
                        {graphqlData?.data?.satellites?.data?.map(
                            (satellite: any) => {
                                let satelliteName =
                                    satellite?.attributes?.name ?? "";
                                return (
                                    <SatelliteStatsTableRow
                                        key={satellite.id}
                                        satName={satelliteName}
                                    />
                                );
                            },
                        )}
                    </tbody>
                </table>
            </div>
        );
    } catch (error) {
        console.error("Error fetching satellites:", error);
        return <div>Error fetching satellites</div>;
    }
}
