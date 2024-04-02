export const runtime = "edge";
import { gql } from "@/__generated__/gql";
import { getClient } from "@/lib/ApolloClient";
import BlockRendererClient from "@/components/BlockRendererClient";
import SatelliteFetcher from "@/components/map/SatelliteFetcher";
const HOST_URL = process.env.HOST_URL;
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GET_SATELLITE_INFO =
    gql(`query GET_SATELLITE_INFO($filters: SatelliteFiltersInput) {
        satellites(filters: $filters) {
          data {
              id
              attributes {
                  celestrakURL
                  catalogNumberNORAD
                  content
                  name
                projects {
                  data {
                    attributes {
                      title
                      coverImage {
                        data {
                          attributes {
                            url
                          }
                        }
                      }
                      slug
                    }
                    id
                  }
                }
              }
          }
        }
      }
  `);

export default async function SatelliteInfoPage({
    params,
}: {
    params: { satelliteSlug: string };
}) {
    const filters = {
        name: {
            eq: params.satelliteSlug,
        },
    };
    try {
        const graphqlData = await getClient().query({
            query: GET_SATELLITE_INFO,
            variables: {
                filters: filters,
            },
        });
        console.log(
            graphqlData.data.satellites?.data[0].attributes?.projects?.data,
        );

        return (
            <div className="flex flex-col items-center">
                <SatelliteFetcher
                    useExampleData={true}
                    filterList={[
                        graphqlData?.data?.satellites?.data[0].attributes
                            ?.name || "",
                    ]}
                />
                {graphqlData?.data?.satellites?.data.map((satellite) => (
                    <div key={satellite.id} className="w-1/2 text-center">
                        <h1 className="mb-4 text-4xl">
                            {satellite?.attributes?.name}
                        </h1>
                        <div className="gap-1">
                            <h1>Altitude: {"1234"}km</h1>
                            <h1>Speed: {"1223"}km/s</h1>
                            <h1>Latitude: {"24.65"}°</h1>
                            <h1>Longitude: {"26.12"}°</h1>
                        </div>
                        <BlockRendererClient
                            content={satellite?.attributes?.content}
                        />
                    </div>
                ))}
                {graphqlData.data.satellites?.data[0].attributes?.projects?.data
                    .length != 0 && (
                    <h1 className="mb-2 mt-2 text-xl font-bold">
                        Related Projects
                    </h1>
                )}
                <div className="mx-10 mt-4 flex flex-wrap justify-center gap-4 md:justify-start">
                    {graphqlData.data.satellites?.data[0].attributes?.projects?.data.map(
                        (project) => {
                            let coverImage =
                                project.attributes?.coverImage?.data?.attributes
                                    ?.url;

                            if (HOST_URL && coverImage != undefined) {
                                coverImage = HOST_URL + coverImage;
                            }
                            return (
                                <Link
                                    className="m-1 transition-transform duration-300 ease-in-out hover:scale-110 hover:transform sm:m-4"
                                    href={
                                        "/projects/" + project?.attributes?.slug
                                    }
                                    key={project.id}
                                >
                                    <Card className="md:w-68 flex h-full w-64 flex-col lg:w-72">
                                        <CardHeader>
                                            <CardTitle className="mb-2 mt-2 text-center text-xl font-bold">
                                                {project?.attributes?.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="h-48">
                                                {coverImage && (
                                                    <Image
                                                        className="max-h-full max-w-full object-contain"
                                                        src={coverImage}
                                                        alt={coverImage}
                                                        width={500}
                                                        height={0}
                                                    />
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        },
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching satellite info:", error);
        return <div>Error fetching satellite info</div>;
    }
}
