import { gql } from "@/__generated__/gql";
import { Projects, SatelliteInfo } from "@/app/satellites/[satelliteSlug]/page";
import { getClient } from "../ApolloClient";

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

export default async function fetchSatelliteInfo({
    params,
}: {
    params: { satelliteSlug: string };
}) {
    let satelliteInfo: SatelliteInfo;

    const filters = {
        name: {
            eq: params.satelliteSlug,
        },
    };

    const graphqlData = await getClient().query({
        query: GET_SATELLITE_INFO,
        variables: {
            filters: filters,
        },
    });

    let projects: Projects[] = [];

    graphqlData?.data?.satellites?.data[0]?.attributes?.projects?.data.map(
        (project: any) => {
            projects.push({
                id: project.id,
                title: project.attributes?.title,
                coverImage:
                    project.attributes?.coverImage?.data?.attributes?.url,
                slug: project.attributes?.slug,
            });
        },
    );

    satelliteInfo = {
        name: graphqlData?.data?.satellites?.data[0]?.attributes?.name ?? "",
        content:
            graphqlData?.data?.satellites?.data[0]?.attributes?.content ?? "",
        relatedProjects: projects ?? [],
    };

    return satelliteInfo;
}
