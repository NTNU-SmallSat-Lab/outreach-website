import { gql } from "@/__generated__/gql";
import { getClient } from "../ApolloClient";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import { Enum_Article_Tag } from "@/__generated__/graphql";
import { BlogPost } from "@/app/blog/page";

const HOST_URL = process.env.HOST_URL;

const GET_ARTICLES = gql(`
query GET_ARTICLES($pagination: PaginationArg, $filters: ArticleFiltersInput) {
    articles(sort: ["datePublished:desc"], pagination: $pagination, filters: $filters) {
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
                title
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
                subtitle
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
    let firstArticle = true;

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

        if (HOST_URL && avatarURL != undefined) {
            avatarURL = HOST_URL + avatarURL;
        }

        const authorName: string | undefined =
            article?.attributes?.author?.data?.attributes?.name;
        const tag: Enum_Article_Tag | null | undefined =
            article?.attributes?.Tag;
        const datePublished: any = article?.attributes?.datePublished;
        let coverImage: string | undefined =
            article?.attributes?.coverImage?.data?.attributes?.url;
        if (HOST_URL && coverImage != undefined) {
            coverImage = HOST_URL + coverImage;
        }
        let content: BlocksContent = article?.attributes?.body ?? [];

        const title: string | undefined = article?.attributes?.title;

        for (const block of content) {
            if (block.type === "paragraph") {
                content = [block];
                break;
            }
        }

        articleList.push({
            key: article.id,
            firstArticle: firstArticle,
            title,
            content,
            coverImage,
            datePublished,
            tag,
            HOST_URL,
            authorName,
            avatarURL,
            slug: article.attributes.slug,
        });

        firstArticle = false;
    });

    const totalArticles = graphqlData.data?.articles?.meta?.pagination?.total;

    return { articleList, totalArticles };
}
