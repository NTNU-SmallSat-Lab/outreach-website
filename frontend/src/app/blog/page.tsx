import BlogPaginator from "./BlogPaginator";
import BlogDataCards from "./blogDataCards";
import {
    PageHeaderAndSubtitle,
    PageSubtitle,
    PageHeader,
} from "@/components/layout/PageHeader";

import { PagePadding } from "@/components/layout/PageLayout";
import React from "react";
import { getClient } from "@/lib/ApolloClient";
import { ResultOf, graphql } from "@/lib/tada/graphql";

type articlesFetchType = ResultOf<typeof GET_ARTICLES>;
export type ArticlesDataType = NonNullable<
    articlesFetchType["articles"]
>["data"];

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

export default async function BlogPage({
    searchParams,
}: {
    searchParams?: { [key: string]: string | undefined };
}) {
    const page = searchParams?.page;
    const currentPage = parseInt(page ?? "1", 10);
    const tag = searchParams?.tag ?? undefined;

    const pageSize = 6;

    let { data, error } = await getClient().query({
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

    if (error || !data) {
        // Handle the case where fetchArticlePages returns null
        return <div>Error fetching articles</div>;
    }

    const result = data?.articles?.data;
    const amount = data.articles?.meta.pagination.total ?? 0;

    if (!result) {
        return <div>Error fetching articles</div>;
    }

    return (
        <>
            <PagePadding>
                <PageHeaderAndSubtitle>
                    <PageHeader>Blog</PageHeader>
                    <PageSubtitle>
                        Welcome to the blog! Here you can find all of the
                        articles we have written.
                    </PageSubtitle>
                </PageHeaderAndSubtitle>
                <div className="flex flex-col justify-center">
                    {/* <BlogDataCards articles={articleCache[currentPage]} /> */}
                    <BlogDataCards articles={result} />
                    <BlogPaginator totalArticles={amount} />
                </div>
            </PagePadding>
        </>
    );
}
