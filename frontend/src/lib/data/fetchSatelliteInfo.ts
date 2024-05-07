import {
    ProjectOrSatellite,
    SatelliteInfo,
} from "@/app/satellites/[satelliteSlug]/page";
import { getClient } from "../ApolloClient";
import { SatelliteName, SatelliteNumber } from "../store";
import { graphql } from "@/lib/tada/graphql";
import { BlocksContent } from "@strapi/blocks-react-renderer";

const GET_SATELLITE_INFO = graphql(`
    query GET_SATELLITE_INFO($filters: SatelliteFiltersInput) {
        satellites(filters: $filters) {
            data {
                id
                attributes {
                    catalogNumberNORAD
                    content
                    name
                    massKg
                    missionStatus
                    satelliteImage {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    projects {
                        data {
                            attributes {
                                title
                                previewImage {
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
                    launchDate
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
        slug: {
            eq: params.satelliteSlug,
        },
    };

    const graphqlData = await getClient().query({
        query: GET_SATELLITE_INFO,
        variables: {
            filters: filters,
        },
    });

    let projects: ProjectOrSatellite[] = [];

    graphqlData?.data?.satellites?.data[0]?.attributes?.projects?.data.map(
        (project: any) => {
            projects.push({
                id: project.id,
                title: project.attributes?.title,
                previewImage:
                    project.attributes?.previewImage?.data?.attributes?.url,
                slug: project.attributes?.slug,
                isProject: true,
            });
        },
    );

    satelliteInfo = {
        name:
            (graphqlData?.data?.satellites?.data[0]?.attributes
                ?.name as SatelliteName) ?? "",
        content: graphqlData?.data?.satellites?.data[0]?.attributes
            ?.content as BlocksContent,
        relatedProjects: projects ?? [],
        noradId:
            (Number(
                graphqlData?.data?.satellites?.data[0]?.attributes
                    ?.catalogNumberNORAD,
            ) as SatelliteNumber) ?? undefined,
        launchDate:
            (graphqlData.data.satellites?.data[0]?.attributes
                ?.launchDate as string) ?? "",
        missionStatus:
            graphqlData?.data?.satellites?.data[0]?.attributes?.missionStatus ??
            undefined,
        massKg:
            graphqlData?.data?.satellites?.data[0]?.attributes?.massKg ??
            undefined,
        satelliteImage:
            graphqlData?.data?.satellites?.data[0]?.attributes?.satelliteImage
                ?.data?.attributes?.url ?? undefined,
    };

    return satelliteInfo;
}
