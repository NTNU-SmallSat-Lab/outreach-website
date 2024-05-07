import { Avatar, AvatarFallback } from "@shadcn/avatar";

import { BlocksContent } from "@strapi/blocks-react-renderer";
import BlockRendererClient from "@/components/BlockRendererClient";
import { getClient } from "@/lib/ApolloClient";
import ShareButtons from "@/components/ShareButtons";
import NextImage from "next/image";
import fullNameToInitials from "@/lib/helpers";
import { graphql } from "@/tada/graphql";

const STRAPI_URL = process.env.BACKEND_INTERNAL_URL;

const GET_ARTICLE_BY_SLUG = graphql(`
    query ArticleWithSlug($articlesFilters: ArticleFiltersInput) {
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
                    previewTitle
                }
            }
        }
    }
`);

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
        graphqlData.data.articles === null ||
        graphqlData.data.articles.data.length === 0
    ) {
        return <div>Article not found</div>;
    }

    let avatarURL =
        graphqlData.data.articles?.data[0]?.attributes?.author?.data?.attributes
            ?.avatar?.data?.attributes?.url;

    if (STRAPI_URL && avatarURL != undefined) {
        avatarURL = STRAPI_URL + avatarURL;
    }

    const article = graphqlData.data.articles?.data[0];

    const authorName = article?.attributes?.author?.data?.attributes?.name;
    const datePublished = article?.attributes?.datePublished as String;
    const content: BlocksContent = article?.attributes?.body as BlocksContent;

    return (
        <div className="flex flex-col items-center gap-4">
            <BlockRendererClient content={content} />
            <div className="flex w-1/2 flex-row items-center gap-1">
                <div className="flex flex-1 justify-start gap-1">
                    {avatarURL && (
                        <Avatar className="">
                            {avatarURL && (
                                <NextImage
                                    src={avatarURL}
                                    alt="Avatar Image"
                                    width={50}
                                    height={50}
                                />
                            )}
                            {!avatarURL && (
                                <AvatarFallback>
                                    {
                                        // Get initials from author name
                                        fullNameToInitials(authorName)
                                    }
                                </AvatarFallback>
                            )}
                        </Avatar>
                    )}
                    <div className="flex flex-col justify-center">
                        <p>{authorName}</p>
                        <p>{datePublished as String}</p>
                    </div>
                </div>
                <div className="flex flex-1 justify-end gap-1">
                    <ShareButtons slug={params.articleSlug} />
                </div>
            </div>
        </div>
    );
}
