export const runtime = "edge";
import { getClient } from "@/lib/ApolloClient";
import { gql } from "@/__generated__/gql";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import BlockRendererClient from "@/components/BlockRendererClient";

const GET_STRUCTURE = gql(`
query GET_STRUCTURE {
    infrastructure {
      data {
        attributes {
          Content
        }
      }
    }
  }
`);

export default async function InfrastructurePage() {
    const graphqlData = await getClient().query({
        query: GET_STRUCTURE,
    });

    const content: BlocksContent =
        graphqlData?.data?.infrastructure?.data?.attributes?.Content ?? [];

    return (
        <div className="flex flex-col">
            <BlockRendererClient content={content} />
            <hr />
            {/* <h1 className="text-3xl font-bold mb-10 mt-5">Content in JSON</h1>
            {content.map((content) => {
                console.log(content);
                return (
                    <div>
                        <h1>{content.type}</h1>
                        <p>{JSON.stringify(content)}</p>
                    </div>
                );
            })} */}
        </div>
    );
}
