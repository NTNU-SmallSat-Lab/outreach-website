export const runtime = "edge";
import FullBlogCard from "@/components/fullBlogCard";
import BlogpageButtons from "@/components/BlogpageButtons";
import { BlogPost } from "./page";
import React from "react";

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
        <>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <BlogpageButtons className="col-span-full" />
                {/* Only map fist article */}
                {articles.map((article: BlogPost) => {
                    if (article.firstArticle) {
                        return (
                            <React.Fragment key={article.key}>
                                <FullBlogCard
                                    className="col-span-full"
                                    article={article}
                                />
                            </React.Fragment>
                        );
                    }
                })}

                {articles.map((article: BlogPost) => {
                    if (article.firstArticle) {
                        return;
                    }
                    return (
                        <React.Fragment key={article.key}>
                            <FullBlogCard article={article} />
                        </React.Fragment>
                    );
                })}
            </div>
        </>
    );
}
