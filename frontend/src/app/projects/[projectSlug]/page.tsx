export const runtime = "edge";
import { gql } from "@/__generated__/gql";
import { getClient } from "@/lib/ApolloClient";
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

    let projectTitle = projects?.attributes?.slug;

    if (HOST_URL && projectTitle != undefined) {
        projectTitle = HOST_URL + projectTitle;
    }

    const projectName = projects?.attributes?.title;
    const projectDescription = projects?.attributes?.description;

    return (
        <div>
            <h1>{projectName}</h1>
            <p>{projectDescription}</p>
        </div>
    );
}
