export const runtime = "edge";
import { gql } from "@/__generated__/gql";
import { getClient } from "@/lib/ApolloClient";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import Link from "next/link";
import Image from "next/image";
import BlockRendererClient from "@/components/BlockRendererClient";
const HOST_URL = process.env.HOST_URL;
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const GET_SATELLITES = gql(`
  query GET_SATELLITES {
    satellites {
      data {
        id
        attributes {
          catalogNumberNORAD
          celestrakURL
          content
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
            <div className="flex justify-center grid grid-cols-1">
                {graphqlData?.data?.satellites?.data?.map((satellite) => (
                    <Card className="w-1/2" key={satellite.id}>
                        <CardHeader>
                            <CardTitle>
                                <Link
                                    className="hover:underline"
                                    href={
                                        "/satellites/" +
                                        satellite?.attributes
                                            ?.catalogNumberNORAD
                                    }
                                >
                                    {satellite?.attributes?.catalogNumberNORAD}
                                </Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <BlockRendererClient
                                content={satellite?.attributes?.content}
                            />
                        </CardContent>
                        <CardFooter>
                            <div className="flex flex-row justify-center gap-1 items-center">
                                <div className="flex flex-col justify-center">
                                    <p>
                                        Catalog Number:{" "}
                                        {
                                            satellite?.attributes
                                                ?.catalogNumberNORAD
                                        }
                                    </p>
                                    <p>
                                        Celestrak URL:{" "}
                                        {satellite?.attributes?.celestrakURL}
                                    </p>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        );
    } catch (error) {
        console.error("Error fetching satellites:", error);
        return <div>Error fetching satellites</div>;
    }
}
