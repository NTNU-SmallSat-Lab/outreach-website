export const runtime = "edge";
import { gql } from "@/__generated__/gql";
import { getClient } from "@/lib/ApolloClient";
import Link from "next/link";

 const GET_PROJECTS = gql(`
 query GET_PROJECTS {
    projects {
      data {
        attributes {
          title
          description
          slug
        }
      }
    }
  }`);


export default async  function ProjectsPage() {
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
        <div>
            <h1>Projects</h1>
            {/* map projects from strapi to component */}
            {}
            {graphqlData.data.projects.data.map((project: any) => ( // TODO: fix any
                <div key={project.attributes.title}>
                    <Link
                        className="hover:underline"
                        href={
                            "/projects/" + project?.attributes?.slug
                        }
                    >
                    {project.attributes.title}</Link>
                    <p>{project.attributes.description}</p>
                </div>)
                )
            }

        </div>
    );
}
