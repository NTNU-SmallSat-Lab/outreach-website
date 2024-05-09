import BlogpageButtons from "./BlogpageButtons";
import React from "react";
import CardWithContent from "@/components/shared/CardWithContent";
import type { ArticlesDataType } from "@/app/blog/page";
import { slicePreviewText } from "@lib/SlicePreviewText";
import CardGrid from "@/components/shared/CardGrid";

const STRAPI_URL = process.env.BACKEND_INTERNAL_URL;

/**
 * Renders a grid of blog data cards based on the provided articles.
 *
 * @param {Object} props - The component props.
 * @param {ArticlesDataType} props.articles - The array of articles to display.
 * @returns {JSX.Element} The rendered blog data cards.
 */
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
