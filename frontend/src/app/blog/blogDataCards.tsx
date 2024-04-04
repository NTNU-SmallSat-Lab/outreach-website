export const runtime = "edge";
import FullBlogCard from "@/components/fullBlogCard";
import BlogpageButtons from "@/components/BlogpageButtons";
import { BlogPost } from "./page";

export default async function BlogDataCards({
    articles,
}: {
    articles: BlogPost[] | null;
}) {
    if (articles === null || articles === undefined) {
        return (
            <div>
                <h1>There are no articles to display</h1>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Only map fist article */}
            {articles.map((article: any) => {
                if (article.firstArticle) {
                    return (
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
                        />
                    );
                }
            })}
            <BlogpageButtons />
            {articles.map((article: any) => {
                if (article.firstArticle) {
                    return;
                }
                return (
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
                    />
                );
            })}
        </div>
    );
}
