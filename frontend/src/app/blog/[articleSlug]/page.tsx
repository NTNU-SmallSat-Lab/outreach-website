export const runtime = "edge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { BlocksContent } from "@strapi/blocks-react-renderer";
import BlockRendererClient from "@/components/BlockRendererClient";
import { gql } from "@/__generated__/gql";
import { getClient } from "@/lib/ApolloClient";
import { BlogCard } from "@/components/ui/blogCard";
import Image from "next/image";
const HOST_URL = process.env.HOST_URL;

const GET_ARTICLE_BY_SLUG = gql(
    `query ArticleWithSlug($articlesFilters: ArticleFiltersInput) {
    articles(filters: $articlesFilters) {
      data {
        id
        attributes {
          author {
            data {
              attributes {
                name
                avatar {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
          body
          coverImage {
            data {
              attributes {
                url
              }
            }
          }
          datePublished
          subtitle
          title
        }
      }
    }
  }
  
  `,
);

export default async function Page({
    params,
}: {
    params: { articleSlug: string };
}) {
    const graphqlData = await getClient().query({
        query: GET_ARTICLE_BY_SLUG,
        variables: {
            articlesFilters: {
                slug: { eq: params.articleSlug },
            },
        },
    });

    if (
        graphqlData.data === null ||
        graphqlData.data === undefined ||
        graphqlData.data.articles === undefined ||
        graphqlData.data.articles === null
    ) {
        return <div>Article not found</div>;
    }
    let avatarURL =
        graphqlData.data.articles?.data[0]?.attributes?.author?.data?.attributes
            ?.avatar?.data?.attributes?.url;

    if (HOST_URL && avatarURL != undefined) {
        avatarURL = HOST_URL + avatarURL;
    }

    const article = graphqlData.data.articles?.data[0];

    const authorName = article?.attributes?.author?.data?.attributes?.name;
    const datePublished = article?.attributes?.datePublished;
    const content: BlocksContent = article?.attributes?.body ?? [];

    let coverImage =
        article?.attributes?.coverImage
            ?.data?.attributes?.url;

    if (HOST_URL && coverImage != undefined) {
        coverImage = HOST_URL + coverImage;
    } else {
        coverImage = "";
    }

    return (
        <div className="flex items-center justify-center">
          <BlogCard
            className={
                article
                    ? "m-20 mt-10 w-full pb-5"
                    : "m-[1%] mb-5 min-w-80 max-w-[30%] grow pb-5"
            }
            key={article.id}
        >
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-4xl font-extrabold">
                    {article?.attributes?.title}
                </h1>
                <div className="flex flex-row items-center justify-center gap-1">
                    {avatarURL && (
                        <Avatar className="">
                            <AvatarImage src={avatarURL} />
                            <AvatarFallback>
                                {// Get initials from author name
                                authorName
                                    ?.split(" ")
                                    .map((name: any) => name[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>
                    )}
                    <div className="flex flex-col justify-center">
                        <p>{authorName}</p>
                        <p>{datePublished}</p>
                    </div>
                </div>
                <div className="relative h-[300px] w-full">
                  <Image 
                      src={coverImage} 
                      alt="coverImage" 
                      className="absolute inset-0 object-contain"
                      layout="fill"
                  />
              </div>
                <div className="w-1/2">
                    <BlockRendererClient content={content} />
                </div>
            </div>
          </BlogCard>
        </div>
    );
}
