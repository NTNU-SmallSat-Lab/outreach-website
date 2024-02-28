export const runtime = "edge";
import { gql } from "@/__generated__/gql";
import { getClient } from "@/lib/ApolloClient";
import BlockRendererClient from "@/components/BlockRendererClient";

const GET_SATELLITE_INFO =
    gql(`query GET_SATELLITE_INFO($filters: SatelliteFiltersInput) {
  satellites(filters: $filters) {
    data {
      attributes {
        celestrakURL
        catalogNumberNORAD
        content
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
    console.log(params.satelliteSlug);

    const filters = {
        catalogNumberNORAD: {
            contains: params.satelliteSlug,
        },
    };
    try {
        const graphqlData = await getClient().query({
            query: GET_SATELLITE_INFO,
            variables: {
                filters: filters,
            },
        });
        console.log(graphqlData);
        return (
            <div>
                {graphqlData?.data?.satellites?.data.map((satellite) => (
                    <div key={satellite?.attributes?.catalogNumberNORAD}>
                        <p>
                            Celestrak URL: {satellite?.attributes?.celestrakURL}
                        </p>
                        <p>
                            Catalog Number NORAD:{" "}
                            {satellite?.attributes?.catalogNumberNORAD}
                        </p>
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
