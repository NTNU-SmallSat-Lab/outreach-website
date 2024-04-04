import { Button } from "@/components/ui/button";
import ColoredSection from "@/components/ui/coloredSection";

import { gql } from "@/__generated__/gql";
import { getClient } from "@/lib/ApolloClient";
const HOST_URL = process.env.HOST_URL;

import Image from "next/image";
import Link from "next/link";
import SatelliteDataTable from "@/components/satelliteData/SatelliteDataTableMultiple";
import fetchSatelliteData from "@components/map/SatelliteFetcher";

const GET_MOST_RECENT_IMAGE = gql(`
query MostRecentImages {
    mostRecentImages(sort: ["publishedAt:desc"]) {
      data {
        attributes {
          mostRecentImage {
            data {
                attributes {
                    url
                }
            }
          }
          satellite {
            data {
              attributes {
                catalogNumberNORAD
                }
              }
            }
            createdAt
            updatedAt
            publishedAt
          }
        }
    }
}

`);

export default async function Home() {
    const graphqlData = await getClient().query({
        query: GET_MOST_RECENT_IMAGE,
    });

    let mostRecentImageURL =
        graphqlData.data.mostRecentImages?.data[0]?.attributes?.mostRecentImage
            ?.data?.attributes?.url;

    if (HOST_URL && mostRecentImageURL != undefined) {
        mostRecentImageURL = HOST_URL + mostRecentImageURL;
    } else {
        mostRecentImageURL = "";
    }

    return (
        <>
            <div className="grid grid-cols-2">
                <div className="grid grid-cols-2">
                    <SatelliteDataTable
                        fetchSatelliteData={fetchSatelliteData}
                    />
                </div>
            </div>

            <ColoredSection
                id="about-us"
                className="flex flex-col items-center px-8 py-12"
            >
                <div className="prose prose-invert flex flex-col items-center text-center prose-img:rounded-xl">
                    <h1>
                        TEST NUMBER 3 Empowering Space Exploration One Satellite
                        at a Time
                    </h1>

                    <div className="relative h-[300px] w-[300px]">
                        <Image
                            alt="Satellite in orbit"
                            src="/images/satellite.jpg"
                            className="m-0 object-fill"
                            layout="fill"
                        />
                    </div>
                    <div className="col-span-2 flex flex-col items-center gap-4 lg:col-span-2 ">
                        <div className=" self-center">
                            <p>
                                NTNU Small Satellite Lab is an initiative to
                                strenghten the small satellite and space related
                                activities at NTNU and make them more visible.
                                At the lab, we have a group consisting of about
                                ten PhD-students, two post.docs and many
                                bachelor- and master students every semester.
                                Physically, the lab consists of a concurrent
                                design work space as well as an well-equiped
                                ESD-safe area for development and testing of
                                electronic and mechanical parts for payloads and
                                platforms.
                            </p>
                        </div>
                    </div>
                </div>
            </ColoredSection>
            <div className="flex flex-col items-center px-8 py-24 text-center">
                <div className="prose prose-invert">
                    <h1 className="">Projects</h1>
                    <p className="">
                        The SmallSat Lab team is part of a variety of projects,
                        a selection listed below. The main effort is on our two
                        satellites; HYPSO-1 (launched January 2022) and HYPSO-2
                        (expected to launch June 2024) - which you can read more
                        about by visiting hypso.space. Activities and research
                        topics include spacecraft- and systems engineering in an
                        university setting, development of hyperspectral camera
                        systems, onboard processing including autonomy and AI,
                        communication infrastructure for small satellites and
                        other satellite autonomous sensor platforms.
                    </p>
                    <Link href={"/projects"}>
                        <Button id="">View more</Button>
                    </Link>
                </div>
            </div>

            <ColoredSection className="flex flex-col items-center px-8 py-12">
                <div className="prose prose-invert flex flex-col items-center text-center prose-img:rounded-xl">
                    <h1 className="">Most recent picture</h1>
                    <div className="relative h-[300px] w-[300px]">
                        <Image
                            alt="Most recent satellite image"
                            src={mostRecentImageURL}
                            className="m-0"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>
            </ColoredSection>
        </>
    );
}
