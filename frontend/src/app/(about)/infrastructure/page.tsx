import { getClient } from "@/lib/ApolloClient";
import { gql } from "@/__generated__/gql";
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";

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

    console.log(content);

    return (
        <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold mb-10 mt-5">Infrastructure</h1>
            <BlocksRenderer content={content} />
            <hr />
            <h1 className="text-3xl font-bold mb-10 mt-5">Content in JSON</h1>
            {content.map((content) => {
                console.log(content);
                return (
                    <div>
                        <h1>{content.type}</h1>
                        <p>{JSON.stringify(content)}</p>
                    </div>
                );
            })}
        </div>
    );
}
