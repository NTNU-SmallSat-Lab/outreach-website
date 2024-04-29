import BlogPaginator from "@/components/BlogPaginator";
import BlogDataCards from "./blogDataCards";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import fetchArticlePages from "@/lib/data/fetchArticleInfo";
import {
    PageHeaderAndSubtitle,
    PageSubtitle,
    PageHeader,
} from "@/components/PageHeader";

import { PagePadding } from "@/components/PageLayout";
import React from "react";

export interface BlogPost {
    key: string | null | undefined;
    firstArticle?: boolean | null | undefined;
    title: string | undefined;
    content: BlocksContent;
    coverImage?: string;
    datePublished: any;
    tag?: string | null | undefined;
    HOST_URL?: string;
    authorName?: string;
    avatarURL?: string;
    slug: string | undefined;
}

export default async function BlogPage({
    searchParams,
}: {
    searchParams?: { [key: string]: string | undefined };
}) {
    const page = searchParams?.page;
    const currentPage = parseInt(page ?? "1", 10);
    const tag = searchParams?.tag ?? null;

    const result = await fetchArticlePages({
        currentPage: currentPage,
        pageSize: 7,
        tag: tag,
    });

    if (!result) {
        // Handle the case where fetchArticlePages returns null
        return <div>Error fetching articles</div>;
    }

    const { articleList, totalArticles } = result;

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
                    <BlogDataCards articles={articleList} />
                    <BlogPaginator totalArticles={totalArticles} />
                </div>
            </PagePadding>
        </>
    );
}
