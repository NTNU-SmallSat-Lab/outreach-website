export const runtime = "edge";
import { gql } from "@/__generated__/gql";
import { getClient } from "@/lib/ApolloClient";
import Link from "next/link";
import BlockRendererClient from "@/components/BlockRendererClient";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BlocksContent } from "@strapi/blocks-react-renderer";
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
          content
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
            <div className="grid grid-cols-3 gap-4">
                {graphqlData?.data?.satellites?.data?.map((satellite) => {
                    let content: BlocksContent =
                        satellite?.attributes?.content ?? [];

                    for (const block of content) {
                        if (block.type === "paragraph") {
                            content = [block];
                            break;
                        }
                    }

                    let previewImage =
                        satellite?.attributes?.previewImage?.data?.attributes
                            ?.url;
                    if (HOST_URL && previewImage != undefined) {
                        previewImage = HOST_URL + previewImage;
                    }
                    return (
                        <Card key={satellite.id}>
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
                                <div className="flex flex-row items-center">
                                    <div className="flex flex-col">
                                        <h1>Altitude:</h1>
                                        <h1>Speed:</h1>
                                    </div>

                                    {previewImage && (
                                        <Image
                                            src={previewImage}
                                            alt={previewImage}
                                            width={200}
                                            height={0} // Set height to 0 to maintain aspect ratio
                                        />
                                    )}
                                </div>
                                <BlockRendererClient content={content} />
                            </CardContent>
                            <CardFooter></CardFooter>
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
