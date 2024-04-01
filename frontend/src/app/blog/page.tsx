
import BlogPaginator from "@/components/BlogPaginator";
import BlogDataCards from "./blogDataCards";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import { Enum_Article_Tag } from "@/__generated__/graphql";

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

// Dictionary to cache articles
// const articleCache: Record<number, BlogPost[]> = {};

export default function BlogPage() {
    let currentPage = 1;
    // const test : BlogPost[] = fetchArticlePages({currentPage: 1, pageSize: 1})

    // useEffect(() => {
    //     if (articleCache[currentPage] === undefined) {
    //         articleCache[currentPage] = fetchArticlePages({
    //             currentPage,
    //             pageSize: 2,
    //         });
    //     }
    // }, [currentPage]);

    const handlePageChange = (newPage: number) => {
        currentPage = newPage;
    };

    return (
        <div>
            {/* <BlogDataCards articles={articleCache[currentPage]} /> */}
            <BlogDataCards articles={null} />
            <BlogPaginator
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
}
