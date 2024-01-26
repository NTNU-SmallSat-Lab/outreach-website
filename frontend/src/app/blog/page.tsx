export const runtime = "edge";
import { components } from "@customTypes/strapi";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";
import { getClient } from "@/lib/ApolloClient";
import { gql } from "@/__generated__/gql";

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
        graphqlData.data.articles === null ||
        graphqlData.data.articles === undefined
    ) {
        return <div>There are no articles to show.</div>;
    }

    return (
        <div>
            <h1 className="text-4xl font-extrabold">Blog</h1>
            <p className="text-sm text-muted-foreground">
                News and other short stories about our activities are shown
                here.
            </p>
            <div className="flex flex-col gap-4 mt-4">
                {graphqlData.data.articles.data.map((article) => {
                    let avatarURL =
                        article.attributes?.author?.data?.attributes?.avatar
                            ?.data[0].attributes?.url;
                    const authorName =
                        article.attributes?.author?.data?.attributes?.name;
                    const datePublished = article.attributes?.datePublished;
                    return (
                        <Card key={article.id}>
                            <CardHeader>
                                <CardTitle>
                                    <Link
                                        className="hover:underline"
                                        href={
                                            "/blog/" + article.attributes?.slug
                                        }
                                    >
                                        {article.attributes?.title}
                                    </Link>
                                </CardTitle>
                                <CardDescription>
                                    {article.attributes?.subtitle}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <BlocksRenderer
                                    content={
                                        article.attributes
                                            ?.body as BlocksContent
                                    }
                                />
                            </CardContent>
                            <CardFooter>
                                <div className="flex flex-row justify-center gap-1 items-center">
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
