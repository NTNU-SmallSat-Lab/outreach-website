import BlogPaginator from "@/components/BlogPaginator";
import BlogDataCards from "./blogDataCards";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import { Enum_Article_Tag } from "@/__generated__/graphql";
import fetchArticlePages from "@/lib/data/fetchArticleInfo";

export interface BlogPost {
    key: string | null | undefined;
    firstArticle?: boolean | null | undefined;
    title: string | undefined;
    content: BlocksContent;
    coverImage?: string;
    datePublished: any;
    tag?: Enum_Article_Tag | null | undefined;
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

    const articles = (await fetchArticlePages({
        currentPage: currentPage,
        pageSize: 7,
        tag: tag,
    })) as BlogPost[];

    return (
        <div className="just flex flex-col content-center justify-center">
            {/* <BlogDataCards articles={articleCache[currentPage]} /> */}
            <BlogDataCards articles={articles} />
            <BlogPaginator />
        </div>
    );
}
