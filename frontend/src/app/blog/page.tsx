export const runtime = "edge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import BlockRendererClient from "@/components/BlockRendererClient";
import { getClient } from "@/lib/ApolloClient";
import { gql } from "@/__generated__/gql";
import Image from "next/image";
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
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-extrabold ">Blog</h1>
            <p className="text-sm text-muted-foreground">
                News and other short stories about our activities are shown
                here.
            </p>
            <div className="flex flex-col gap-4 mt-4 justify-center items-center">
                {graphqlData.data.articles.data.map((article) => {
                    let avatarURL =
                        article?.attributes?.author?.data?.attributes?.avatar
                            ?.data?.[0]?.attributes?.url;

                    if (HOST_URL && avatarURL != undefined) {
                        avatarURL = HOST_URL + avatarURL;
                    }

                    const authorName =
                        article?.attributes?.author?.data?.attributes?.name;
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
                        <Card className="w-1/2" key={article.id}>
                            <CardHeader>
                                <CardTitle>
                                    <Link
                                        className="hover:underline"
                                        href={
                                            "/blog/" + article?.attributes?.slug
                                        }
                                    >
                                        {article?.attributes?.title}
                                    </Link>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {coverImage && (
                                    <Image
                                        src={coverImage}
                                        alt={coverImage}
                                        width={500}
                                        height={0} // Set height to 0 to maintain aspect ratio
                                    />
                                )}
                                <BlockRendererClient content={content} />
                            </CardContent>
                            <CardFooter>
                                <div className="flex flex-row justify-center gap-1 items-center">
                                    {avatarURL && (
                                        <Avatar className="">
                                            <AvatarImage src={avatarURL} />
                                            <AvatarFallback>
                                                {// Get initials from author name
                                                authorName
                                                    ?.split(" ")
                                                    .map((name) => name[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className="flex flex-col justify-center">
                                        <p>{authorName}</p>
                                        <p>{datePublished}</p>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
