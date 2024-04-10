export const runtime = "edge";
import { gql } from "@/__generated__/gql";
import { getClient } from "@/lib/ApolloClient";
import SatelliteCard from "@/components/ui/satelliteCard";
import {
    PageHeader,
    PageHeaderAndSubtitle,
    PageSubtitle,
} from "@/components/PageHeader";

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
            <div>
                <PageHeaderAndSubtitle>
                    <PageHeader>Satellites</PageHeader>
                    <PageSubtitle>
                        Theese are all the satellites we have worked on.
                    </PageSubtitle>
                </PageHeaderAndSubtitle>
                <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                    {graphqlData?.data?.satellites?.data?.map(
                        (satellite: any) => {
                            let previewImage =
                                satellite?.attributes?.previewImage?.data
                                    ?.attributes?.url;
                            if (
                                OUTSIDE_STRAPI_URL &&
                                previewImage != undefined
                            ) {
                                previewImage =
                                    OUTSIDE_STRAPI_URL + previewImage;
                            }
                            let satelliteName =
                                satellite?.attributes?.name ?? "";
                            let missionStatus =
                                satellite?.attributes?.missionStatus ?? "";
                            return (
                                // eslint-disable-next-line react/jsx-key
                                <SatelliteCard
                                    satelliteName={satelliteName}
                                    missionStatus={missionStatus}
                                    previewImage={previewImage}
                                    satelliteId={satellite.id}
                                ></SatelliteCard>
                            );
                        },
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching satellites:", error);
        return <div>Error fetching satellites</div>;
    }
}
