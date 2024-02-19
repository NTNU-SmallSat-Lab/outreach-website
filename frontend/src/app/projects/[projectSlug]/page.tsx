export const runtime = "edge";
import { gql } from "@/__generated__/gql";
import BlockRendererClient from "@/components/BlockRendererClient";
import { getClient } from "@/lib/ApolloClient";
import { BlocksContent } from "@strapi/blocks-react-renderer";
const HOST_URL = process.env.HOST_URL;

const GET_PROJECT_BY_SLUG = gql(`
query Projects($projectFilters: ProjectFiltersInput) {
    projects(filters: $projectFilters) {
      data {
        attributes {
          title
          description
          article
          satellites {
            data {
              id
              attributes {
                catalogNumberNORAD
                projects {
                  data {
                    id
                  }
                }
                createdAt
                updatedAt
                publishedAt
              }
            }
          }
          slug
          publishedAt
          coverImage {
            data {
              id
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }`);

export default async function Page({
    params,
}: {
    params: { projectSlug: string };
}) {
    const graphqlData = await getClient().query({
        query: GET_PROJECT_BY_SLUG,
        variables: {
            projectFilters: {
                slug: { eq: params.projectSlug },
            },
        },
    });

    if (
        graphqlData.data === null ||
        graphqlData.data === undefined ||
        graphqlData.data.projects === undefined ||
        graphqlData.data.projects === null
    ) {
        return <div>Project not found</div>;
    }

    const projects = graphqlData.data.projects?.data[0];
    const content: BlocksContent = projects?.attributes?.article ?? [];

    let projectTitle = projects?.attributes?.slug;

    if (HOST_URL && projectTitle != undefined) {
        projectTitle = HOST_URL + projectTitle;
    }

    return (
      <div className="flex flex-col gap-4 items-center">
            <h1 className="text-4xl font-extrabold">
              {projects?.attributes?.title}
            </h1>
            <div className="w-1/2">
              <BlockRendererClient content={content} />
            </div>
        </div>
    );
}
