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
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {/* Only map fist article */}
            {articles.map((article: any) => {
                if (article.firstArticle) {
                    return (
                        <FullBlogCard
                            className="col-span-full"
                            article={article}
                            key={article.ID}
                        />
                    );
                }
            })}
            <BlogpageButtons className="col-span-full" />
            {articles.map((article: any) => {
                if (article.firstArticle) {
                    return;
                }
                return <FullBlogCard article={article} key={article.ID} />;
            })}
        </div>
    );
}
