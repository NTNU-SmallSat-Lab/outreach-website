import BlogPaginator from "@/components/BlogPaginator";
import BlogDataCards from "./blogDataCards";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import { Enum_Article_Tag } from "@/__generated__/graphql";
import fetchArticlePages from "@/lib/data/fetchArticleInfo";
import {
    PageHeaderAndSubtitle,
    PageSubtitle,
    PageHeader,
} from "@/components/PageHeader";

export interface BlogPost {
    key: string | null | undefined;
    firstArticle?: boolean | null | undefined;
    title: string | undefined;
    content: BlocksContent; // Or a more appropriate type if your content is structured
    coverImage?: string; // Optional cover image
    datePublished: any;
    tag?: Enum_Article_Tag | null | undefined; // Optional tag
    HOST_URL?: string; // It's common to keep the host URL separate from post data
    authorName?: string;
    avatarURL?: string; // Optional avatar URL
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

    const articles = (await fetchArticlePages({
        currentPage: currentPage,
        pageSize: 7,
        tag: tag,
    })) as BlogPost[];

    return (
        <>
            <PageHeaderAndSubtitle>
                <PageHeader>Blog</PageHeader>
                <PageSubtitle>
                    Welcome to the blog! Here you can find all of the articles
                    we have written.
                </PageSubtitle>
            </PageHeaderAndSubtitle>
            <div className="just flex flex-col content-center justify-center">
                {/* <BlogDataCards articles={articleCache[currentPage]} /> */}
                <BlogDataCards articles={articles} />
                <BlogPaginator />
            </div>
        </>
    );
}
