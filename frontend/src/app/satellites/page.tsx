export const runtime = "edge";
import { gql } from "@/__generated__/gql";
import { getClient } from "@/lib/ApolloClient";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SatelliteStatsTable from "@/components/ui/satelliteStatsTable";
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
          satelliteName
          previewImage {
            data {
              attributes {
                url
              }
            }
          }
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
            <div className="grid grid-cols-2 gap-4 justify-items-center">
                {graphqlData?.data?.satellites?.data?.map((satellite) => {
                    let previewImage =
                        satellite?.attributes?.previewImage?.data?.attributes
                            ?.url;
                    if (HOST_URL && previewImage != undefined) {
                        previewImage = HOST_URL + previewImage;
                    }
                    return (
                        <Card key={satellite.id} className="w-3/4">
                            <CardHeader className="flex flex-col justify-center items-center">
                                <CardTitle>
                                    <Link
                                        href={
                                            "/satellites/" +
                                            satellite?.attributes?.satelliteName
                                        }
                                        className="hover:underline"
                                    >
                                        {satellite?.attributes?.satelliteName}
                                    </Link>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center">
                                <SatelliteStatsTable />
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
                    );
                })}
            </div>
        );
    } catch (error) {
        console.error("Error fetching satellites:", error);
        return <div>Error fetching satellites</div>;
    }
}
