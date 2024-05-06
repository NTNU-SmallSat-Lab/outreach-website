import { getClient } from "../ApolloClient";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import { BlogPost } from "@/app/blog/page";
import { graphql } from "@/tada/graphql";

const STRAPI_URL = process.env.BACKEND_INTERNAL_URL;

const GET_ARTICLES = graphql(`
    query GET_ARTICLES(
        $pagination: PaginationArg
        $filters: ArticleFiltersInput
    ) {
        articles(
            sort: ["datePublished:desc"]
            pagination: $pagination
            filters: $filters
        ) {
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
                    previewTitle
                    datePublished
                    body
                    coverImage {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    createdAt
                    publishedAt
                    slug
                    Tag
                }
            }
            meta {
                pagination {
                    total
                }
            }
        }
    }
`);

export default async function fetchArticlePages({
    currentPage,
    pageSize,
    tag,
}: {
    currentPage: number;
    pageSize: number;
    tag: string | null;
}) {

    let graphqlData;

    if (!tag) {
        graphqlData = await getClient().query({
            query: GET_ARTICLES,
            variables: {
                pagination: {
                    pageSize: pageSize,
                    page: currentPage,
                },
            },
        });
    } else {
        graphqlData = await getClient().query({
            query: GET_ARTICLES,
            variables: {
                pagination: {
                    pageSize: pageSize,
                    page: currentPage,
                },
                filters: {
                    Tag: {
                        contains: tag,
                    },
                },
            },
        });
    }
    if (
        graphqlData.data === null ||
        graphqlData.data === undefined ||
        graphqlData.data.articles === undefined ||
        graphqlData.data.articles === null
    ) {
        return null;
    }
    let articleList: BlogPost[] = [];

    graphqlData.data.articles.data.forEach((article: any) => {
        let avatarURL: string | undefined =
            article?.attributes?.author?.data?.attributes?.avatar?.data
                ?.attributes?.url;

        if (STRAPI_URL && avatarURL != undefined) {
            avatarURL = STRAPI_URL + avatarURL;
        }

        const authorName: string | undefined =
            article?.attributes?.author?.data?.attributes?.name;
        const tag: string | null | undefined = article?.attributes?.Tag;
        const datePublished: any = article?.attributes?.datePublished;
        let coverImage: string | undefined =
            article?.attributes?.coverImage?.data?.attributes?.url;
        if (STRAPI_URL && coverImage != undefined) {
            coverImage = STRAPI_URL + coverImage;
        }
        let content: BlocksContent = article?.attributes?.body ?? [];

        const title: string | undefined = article?.attributes?.previewTitle;

        for (const block of content) {
            if (block.type === "paragraph") {
                content = [block];
                break;
            }
        }

        articleList.push({
            key: article.id,
            title,
            content,
            coverImage,
            datePublished,
            tag,
            HOST_URL: STRAPI_URL,
            authorName,
            avatarURL,
            slug: article.attributes.slug,
        });

    });

    const totalArticles = graphqlData.data?.articles?.meta?.pagination?.total;

    return { articleList, totalArticles };
}
