export const runtime = "edge";
import { gql } from "@/__generated__/gql";
import { getClient } from "@/lib/ApolloClient";
import BlockRendererClient from "@/components/BlockRendererClient";
import SatelliteFetcher from "@/components/map/SatelliteFetcher";

const GET_SATELLITE_INFO =
    gql(`query GET_SATELLITE_INFO($filters: SatelliteFiltersInput) {
  satellites(filters: $filters) {
    data {
        id
        attributes {
            celestrakURL
            catalogNumberNORAD
            content
            satelliteName
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
        satelliteName: {
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
        return (
            <div className="flex flex-col items-center">
                <SatelliteFetcher
                    useExampleData={true}
                    filterList={[
                        graphqlData?.data?.satellites?.data[0].attributes
                            ?.satelliteName || "",
                    ]}
                />

                {graphqlData?.data?.satellites?.data.map((satellite) => (
                    <div key={satellite.id} className="w-1/2 text-center">
                        <h1 className="text-4xl mb-4">
                            {satellite?.attributes?.satelliteName}
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
            </div>
        );
    } catch (error) {
        console.error("Error fetching satellite info:", error);
        return <div>Error fetching satellite info</div>;
    }
}
