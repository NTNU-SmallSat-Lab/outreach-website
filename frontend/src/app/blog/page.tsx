export const runtime = "edge";
import Link from "next/link";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import BlockRendererClient from "@/components/BlockRendererClient";
import { getClient } from "@/lib/ApolloClient";
import { gql } from "@/__generated__/gql";
import Image from "next/image";
import {
    BlogCard,
    BlogCardContent,
    BlogCardHeader,
    BlogCardTitle,
} from "@/components/ui/blogCard";
import BlogpageButtons from "@/components/BlogpageButtons";

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

    return (
        <div className="flex flex-col items-center justify-center">
            <BlogpageButtons />
            <div className="flex flex-row flex-wrap items-center justify-center">
                {graphqlData.data.articles.data.map((article) => {
                    let avatarURL =
                        article?.attributes?.author?.data?.attributes?.avatar?.data?.attributes?.url

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
                    let content: BlocksContent =
                        article?.attributes?.body ?? [];

                    for (const block of content) {
                        if (block.type === "paragraph") {
                            content = [block];
                            break;
                        }
                    }

                    return (
                        <BlogCard
                            className="m-3 w-1/4 min-w-80"
                            key={article.id}
                        >
                            <BlogCardHeader>
                                <BlogCardContent>
                                    {coverImage && (
                                        <Image
                                            src={coverImage}
                                            alt={coverImage}
                                            width={800}
                                            height={400}
                                            className="m-0 aspect-video w-full object-cover p-0"
                                        />
                                    )}
                                    <div className="m-5">
                                        <div className="flex">
                                            <p className="w-fit rounded-md bg-ntnuBlue p-2 text-center text-xs text-white">
                                                {tag ? tag : "No tag"}
                                            </p>
                                            <p className="w-fit p-2 text-center text-xs text-white">
                                                {datePublished} by {authorName}
                                            </p>
                                        </div>
                                        <BlogCardTitle className="my-2">
                                            <Link
                                                className="hover:underline"
                                                href={
                                                    "/blog/" +
                                                    article?.attributes?.slug
                                                }
                                            >
                                                {article?.attributes?.title}
                                            </Link>
                                        </BlogCardTitle>
                                        <BlockRendererClient
                                            content={content}
                                        />
                                    </div>
                                </BlogCardContent>
                            </BlogCardHeader>
                        </BlogCard>
                    );
                })}
            </div>
        </div>
    );
}
