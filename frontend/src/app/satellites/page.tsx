export const runtime = "edge";
import { gql } from "@/__generated__/gql";
import { getClient } from "@/lib/ApolloClient";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SatelliteStatsTable from "@/components/satelliteData/SatelliteStatsTable";
import Image from "next/image";
import { OuiImage } from "@/components/fullBlogCard";

const OUTSIDE_STRAPI_URL = process.env.OUTSIDE_STRAPI_URL;
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
                    if (OUTSIDE_STRAPI_URL && previewImage != undefined) {
                        previewImage = OUTSIDE_STRAPI_URL + previewImage;
                    }
                    let satelliteName = satellite?.attributes?.name ?? "";
                    let missionStatus =
                        satellite?.attributes?.missionStatus ?? "";
                    return (
                        <Link
                            href={"/satellites/" + satellite?.attributes?.name}
                            className="w-1/1.5 m-1 transition-transform duration-300 ease-in-out sm:m-4 md:w-1/3"
                            key={satellite.id}
                        >
                            <Card className="flex h-full w-full flex-col">
                                <CardHeader className="flex flex-col items-center justify-center">
                                    <CardTitle>
                                        {satellite?.attributes?.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center">
                                    <SatelliteStatsTable
                                        satName={satelliteName}
                                        missionStatus={missionStatus}
                                    />
                                    {previewImage ? (
                                        <Image
                                            src={previewImage}
                                            alt={previewImage}
                                            width={200}
                                            height={0}
                                            className="margin p-2"
                                        />
                                    ) : (
                                        <div className="m-0 flex aspect-video max-h-full max-w-full items-center justify-center object-contain">
                                            <OuiImage />
                                        </div>
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
