export const runtime = "edge";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import { getClient } from "@/lib/ApolloClient";
import { gql } from "@/__generated__/gql";
import FullBlogCard from "@/components/fullBlogCard";
import BlogpageButtons from "@/components/BlogpageButtons";
import { JSX } from "react";

const HOST_URL = process.env.HOST_URL;

const GET_ARTICLES = gql(`
query GET_ARTICLES {
    articles(sort: ["datePublished:desc"]) {
        data {
            id
            attributes {
                author {
                    data {
                        attributes {
                            name
                            avatar {
                                data {
                                    attributes {
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
                title
                datePublished
                body
                coverImage {
                    data {
                        attributes {
                            url
                        }
                    }
                }
                createdAt
                publishedAt
                slug
                subtitle
                Tag
            }
        }
    }
}
`);

export default async function BlogPage() {
    const graphqlData = await getClient().query({
        query: GET_ARTICLES,
    });

    if (
        graphqlData.data === null ||
        graphqlData.data === undefined ||
        graphqlData.data.articles === undefined ||
        graphqlData.data.articles === null
    ) {
        return <div>There are no articles to show.</div>;
    }

    let firstArticle = true;
    let articleList: JSX.Element[] = [];

    return (
        <div className="flex flex-col items-center justify-center">
            {graphqlData.data.articles.data.map((article) => {
                let avatarURL =
                    article?.attributes?.author?.data?.attributes?.avatar?.data
                        ?.attributes?.url;

                if (HOST_URL && avatarURL != undefined) {
                    avatarURL = HOST_URL + avatarURL;
                }

                const authorName =
                    article?.attributes?.author?.data?.attributes?.name;
                const tag = article?.attributes?.Tag;
                const datePublished = article?.attributes?.datePublished;
                let coverImage =
                    article?.attributes?.coverImage?.data?.attributes?.url;
                if (HOST_URL && coverImage != undefined) {
                    coverImage = HOST_URL + coverImage;
                }
                let content: BlocksContent = article?.attributes?.body ?? [];

                const title = article?.attributes?.title;

                for (const block of content) {
                    if (block.type === "paragraph") {
                        content = [block];
                        break;
                    }
                }

                if (firstArticle) {
                    firstArticle = false;
                    return (
                        <div
                            key={article.id}
                            className="flex w-3/4 flex-col items-center justify-center"
                        >
                            <FullBlogCard
                                key={article.id} // A unique ID for each blog post
                                firstArticle={true}
                                content={content}
                                coverImage={coverImage}
                                datePublished={datePublished}
                                tag={tag}
                                HOST_URL={HOST_URL}
                                authorName={authorName}
                                avatarURL={avatarURL}
                                slug={article?.attributes?.slug}
                                title={title}
                            />
                            {<BlogpageButtons />}
                        </div>
                    );
                } else {
                    articleList.push(
                        <FullBlogCard
                            key={article.id} // A unique ID for each blog post
                            firstArticle={false}
                            content={content}
                            coverImage={coverImage}
                            datePublished={datePublished}
                            tag={tag}
                            HOST_URL={HOST_URL}
                            authorName={authorName}
                            avatarURL={avatarURL}
                            slug={article?.attributes?.slug}
                            title={title}
                        />,
                    );
                }
            })}
            <div className="flex w-4/5 flex-row flex-wrap items-center justify-center">
                {articleList.map((article) => {
                    return article;
                })}
            </div>
        </div>
    );
}
