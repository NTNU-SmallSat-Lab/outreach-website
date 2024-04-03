export const runtime = "edge";
import { gql } from "@/__generated__/gql";
import { getClient } from "@/lib/ApolloClient";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SatelliteStatsTable from "@/components/ui/SatelliteStatsTable";
import Image from "next/image";

const HOST_URL = process.env.HOST_URL;
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
            <div className="mx-10 mt-4 flex flex-wrap justify-center gap-4 md:justify-start">
                {graphqlData?.data?.satellites?.data?.map((satellite: any) => {
                    let previewImage =
                        satellite?.attributes?.previewImage?.data?.attributes
                            ?.url;
                    if (HOST_URL && previewImage != undefined) {
                        previewImage = HOST_URL + previewImage;
                    }
                    let satelliteName = satellite?.attributes?.name ?? "";
                    let missionStatus =
                        satellite?.attributes?.missionStatus ?? "";
                    return (
                        <Link
                            href={"/satellites/" + satellite?.attributes?.name}
                            className="m-1 transition-transform duration-300 ease-in-out hover:scale-110 hover:transform sm:m-4"
                            key={satellite.id}
                        >
                            <Card className="md:w-76 flex h-full w-72 flex-col">
                                <CardHeader className="flex flex-col items-center justify-center">
                                    <CardTitle>
                                        {satellite?.attributes?.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center">
                                    <SatelliteStatsTable satName={satelliteName} missionStatus={missionStatus}/>
                                    {previewImage && (
                                        <Image
                                            src={previewImage}
                                            alt={previewImage}
                                            width={200}
                                            height={0}
                                            className="margin p-2"
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        );
    } catch (error) {
        console.error("Error fetching satellites:", error);
        return <div>Error fetching satellites</div>;
    }
}
