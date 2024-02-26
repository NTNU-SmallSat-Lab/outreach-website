import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { gql } from "@/__generated__/gql";
import { getClient } from "@/lib/ApolloClient";

// Dynamic import because of leaflet and globe.gl ssr problem with next.js
import dynamic from "next/dynamic";
import SatelliteFetcher from "@/components/map/SatelliteFetcher";

const MyCustomMap = dynamic(() => import("@/components/map/MyCustomMap"), {
    ssr: false,
});

const HOST_URL = process.env.HOST_URL;
const GET_CARDS = gql(`query HomepageCards {
  homepageCards {
    data {
      attributes {
        Title
        coverImage {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}`);

export default async function Home() {
    const graphqlData = await getClient().query({
        query: GET_CARDS,
    });

    const cardsData = graphqlData?.data?.homepageCards?.data || [];
    return (
        <main>
            {/* <SatelliteFetcher useExampleData={true} />

            <MyCustomMap /> */}
            <h1 className="text-gray-500 text-center text-3xl font-bold mb-4">
                Small Satellite Lab
            </h1>
            <div className="pt-8 flex flex-wrap justify-center items-center py-12 px-8">
                {cardsData.map((card) => {
                    const title = card.attributes?.Title || "";
                    let coverImage =
                        card.attributes?.coverImage?.data?.attributes?.url ||
                        "";
                    if (HOST_URL && coverImage != undefined) {
                        coverImage = HOST_URL + coverImage;
                    }
                    return (
                        <Link
                            href={"/" + title.toLowerCase()}
                            key={title}
                            className="m-2 sm:m-4 hover:transform hover:scale-110 transition-transform duration-300 ease-in-out"
                        >
                            <div className="max-w-xl mx-auto">
                                <Card className="w-64 h-50 md:w-68 lg:w-72 bg-neutral-50 flex flex-col justify-center">
                                    <CardHeader>
                                        <CardTitle className="text-black flex justify-center items-center">
                                            <p>{title}</p>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex justify-center items-center">
                                        {coverImage !== "" ? (
                                            <Image
                                                className="rounded-full w-full h-full object-cover w-36 h-36 md:w-48 md:h-48 lg:w-48 lf:h-48"
                                                src={coverImage}
                                                alt={title}
                                                width={500}
                                                height={500}
                                                quality={100}
                                            />
                                        ) : (
                                            <h1 className="text-gray-500">
                                                No Image
                                            </h1>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </main>
    );
}
