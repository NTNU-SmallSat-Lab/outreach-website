export const runtime = "edge";
import FullBlogCard from "@/components/fullBlogCard";
import BlogpageButtons from "@/components/BlogpageButtons";
import { BlogPost } from "./page";
import fetchArticlePages from "@/lib/data/fetchArticleInfo";

export default async function BlogDataCards({
    articles,
}: {
    articles: BlogPost[] | null;
}) {

    const test : BlogPost[] = fetchArticlePages({currentPage: 1, pageSize: 1})

    return (
        <div className="flex flex-col items-center justify-center">
            {test.map((article: any) => {
                return (
                    <div
                        key={article.id}
                        className="flex w-3/4 flex-col items-center justify-center"
                    >
                        <FullBlogCard
                            key={article.id} // A unique ID for each blog post
                            firstArticle={article.firstArticle}
                            content={article.content}
                            coverImage={article.coverImage}
                            datePublished={article.datePublished}
                            tag={article.tag}
                            HOST_URL={article.HOST_URL}
                            authorName={article.authorName}
                            avatarURL={article.avatarURL}
                            slug={article.slug}
                            title={article.title}
                        />{" "}
                        {article.firstArticle ? <BlogpageButtons /> : null}
                    </div>
                );
            })}
        </div>
    );
}
