import { gql } from "@/__generated__/gql";
import { getClient } from "@/lib/ApolloClient";
import Hero from "@/components/ui/hero";

const STRAPI_URL = process.env.STRAPI_URL;

const GET_HERO_DATA = gql(`
query Query($publicationState: PublicationState) {
    hero(publicationState: $publicationState) {
      data {
        attributes {
          text
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }`);

export default async function HeroWrapper() {

    const graphqlData = await getClient().query({
        query: GET_HERO_DATA,
    });

    if (
        graphqlData.data === null ||
        graphqlData.data === undefined
    ) {
        return <div>There are no projects to show.</div>;
    }

    

    return (
        <>
        <Hero title={"Hero"} description={graphqlData.data.hero?.data?.attributes?.text as string} imageUrl={(STRAPI_URL! + graphqlData.data.hero?.data?.attributes?.image?.data?.attributes?.url) as string}></Hero>
        </>
    );
}
