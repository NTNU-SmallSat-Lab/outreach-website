import { gql } from "@/__generated__/gql";
import { getClient } from "../ApolloClient";
import Image from "next/image";

const HOST_URL = process.env.HOST_URL;

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
                name
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

export default async function fetchMostrecentImage() {
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

    const imageSatelliteRelation =
        graphqlData.data.mostRecentImages?.data[0]?.attributes?.satellite?.data
            ?.attributes?.name;

    return (
        <div>
            <div className="relative h-[300px] w-[300px]">
                <Image
                    alt="Most recent satellite image"
                    src={mostRecentImageURL}
                    className="m-0"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="">
                <p>Taken by {imageSatelliteRelation}</p>
            </div>
        </div>
    );
}
