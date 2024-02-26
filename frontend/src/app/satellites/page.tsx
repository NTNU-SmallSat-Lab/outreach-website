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
            <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-4">
                    {graphqlData?.data?.satellites?.data?.map((satellite) => (
                        <Card key={satellite.id}>
                            <CardHeader>
                                <CardTitle>
                                    <Link
                                        href={
                                            "/satellites/" +
                                            satellite?.attributes
                                                ?.catalogNumberNORAD
                                        }
                                        className="hover:underline"
                                    >
                                        {
                                            satellite?.attributes
                                                ?.catalogNumberNORAD
                                        }
                                    </Link>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <BlockRendererClient
                                    content={satellite?.attributes?.content}
                                />
                            </CardContent>
                            <CardFooter>
                                <div>
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
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching satellites:", error);
        return <div>Error fetching satellites</div>;
    }
}
