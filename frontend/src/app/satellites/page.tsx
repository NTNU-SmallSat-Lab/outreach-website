import { gql } from "@/__generated__/gql";
import {
    PageHeaderAndSubtitle,
    PageHeader,
    PageSubtitle,
} from "@/components/PageHeader";
import SatelliteStatsTableRow from "@/components/satelliteData/SatelliteStatsTableRow";
import { getClient } from "@/lib/ApolloClient";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/shadcn/table";

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

        return (
            <div className="flex w-full flex-col items-center justify-center">
                <PageHeaderAndSubtitle>
                    <PageHeader>Satellites</PageHeader>
                    <PageSubtitle>
                        Here are the satellites we have worked on. Click on them
                        to see more details.
                    </PageSubtitle>
                </PageHeaderAndSubtitle>
                <Table className="table-auto border-collapse rounded-md border-b border-white shadow">
                    <TableHeader>
                        <TableRow className="border-y border-white px-3 py-2 text-left text-white">
                            <TableHead className="px-6">Satellite</TableHead>
                            <TableHead className="px-6">Speed</TableHead>
                            <TableHead className="px-6">Altitude</TableHead>
                            <TableHead className="px-6">Latitude</TableHead>
                            <TableHead className="px-6">Longitude</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {graphqlData?.data?.satellites?.data?.map(
                            (satellite: any) => {
                                let satelliteName =
                                    satellite?.attributes?.name ?? "";
                                return (
                                    <SatelliteStatsTableRow
                                        key={satellite.id}
                                        satName={satelliteName}
                                        slug={satellite?.attributes?.slug}
                                    />
                                );
                            },
                        )}
                    </TableBody>
                </Table>
            </div>
        );
    } catch (error) {
        console.error("Error fetching satellites:", error);
        return <div>Error fetching satellites</div>;
    }
}
