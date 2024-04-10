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
        <div className="flex w-3/4 flex-row flex-wrap items-center justify-center self-center">
            {articles.map((article: any) => {
                return (
                    <div
                        key={article.id}
                        className={
                            article.firstArticle
                                ? "flex w-full flex-col items-center justify-center"
                                : "flex w-1/3 flex-col items-center justify-center"
                        }
                    >
                        <FullBlogCard
                            key={article.id}
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
