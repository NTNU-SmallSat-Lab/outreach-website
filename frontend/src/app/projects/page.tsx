import { getClient } from "@/lib/ApolloClient";
import { slicePreviewText } from "@lib/SlicePreviewText";
import {
    PageHeader,
    PageHeaderAndSubtitle,
    PageSubtitle,
} from "@/components/layout/PageHeader";
import CardWithContent from "@/components/shared/CardWithContent";
import { graphql } from "@/lib/tada/graphql";
import CardGrid from "@/components/shared/CardGrid";
const STRAPI_URL = process.env.BACKEND_INTERNAL_URL;

const GET_PROJECTS = graphql(`
    query GET_PROJECTS {
        projects(sort: ["publishedAt:desc"]) {
            data {
                id
                attributes {
                    title
                    content
                    satellites {
                        data {
                            attributes {
                                catalogNumberNORAD
                            }
                        }
                    }
                    slug
                    previewImage {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                }
            }
        }
    }
`);

export default async function ProjectsPage() {
    const graphqlData = await getClient().query({
        query: GET_PROJECTS,
    });

    if (
        graphqlData.data === null ||
        graphqlData.data === undefined ||
        graphqlData.data.projects === undefined ||
        graphqlData.data.projects === null
    ) {
        return <div>There are no projects to show.</div>;
    }

    return (
        <div className="mx-auto w-full max-w-6xl grow bg-opacity-50 px-4 py-8 sm:px-8 md:px-10">
            <div className="flex flex-col items-center justify-center">
                <PageHeaderAndSubtitle>
                    <PageHeader data-testid="projectHeading">
                        Our Projects
                    </PageHeader>
                    <PageSubtitle>
                        Information about our various projects are shown here.
                    </PageSubtitle>
                </PageHeaderAndSubtitle>
            </div>

            <CardGrid>
                {graphqlData.data.projects.data.map((project) => {
                    let previewImage =
                        project?.attributes?.previewImage?.data?.attributes
                            ?.url;

                    if (STRAPI_URL && previewImage != undefined) {
                        previewImage = STRAPI_URL + previewImage;
                    }
                    return (
                        <CardWithContent
                            key={project.id}
                            data-testid="projectCard"
                            title={project?.attributes?.title ?? ""}
                            link={"/projects/" + project?.attributes?.slug}
                            imageURL={previewImage}
                            description={slicePreviewText(
                                project?.attributes?.content ?? [],
                            )}
                        ></CardWithContent>
                    );
                })}
            </CardGrid>
        </div>
    );
}
