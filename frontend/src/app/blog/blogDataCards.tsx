import BlogpageButtons from "@/components/BlogpageButtons";
import React from "react";
import CardWithContent from "@/components/CardWithContent";
import type { ArticlesDataType } from "@/app/blog/page";
import { slicePreviewText } from "@/components/SlicePreviewText";
import CardGrid from "@/components/CardGrid";

const STRAPI_URL = process.env.BACKEND_INTERNAL_URL;

export default async function BlogDataCards({
    articles,
}: {
    articles: ArticlesDataType;
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
            <CardGrid>
                <BlogpageButtons className="col-span-full" />
                {articles.map((article) => {
                    let imgurl = undefined;
                    if (
                        STRAPI_URL &&
                        article.attributes?.coverImage?.data?.attributes?.url
                    ) {
                        imgurl =
                            STRAPI_URL +
                            article.attributes?.coverImage?.data?.attributes
                                ?.url;
                    }

                    return (
                        <CardWithContent
                            key={article.id}
                            title={article.attributes?.previewTitle ?? ""}
                            link={"/blog/" + article.attributes?.slug}
                            imageURL={imgurl}
                            tag={article.attributes?.Tag ?? "General"}
                            description={slicePreviewText(
                                article.attributes?.body,
                            )}
                            datePublished={article.attributes?.datePublished}
                        ></CardWithContent>
                    );
                })}
            </CardGrid>
        </>
    );
}
