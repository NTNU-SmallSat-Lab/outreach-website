import {
    BlogCard,
    BlogCardContent,
    BlogCardHeader,
    BlogCardTitle,
} from "@/components/ui/blogCard";

import BlockRendererClient from "./BlockRendererClient";
import { Enum_Article_Tag } from "@/__generated__/graphql";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import Link from "next/link";

interface BlogPost {
    key: string | null | undefined;
    firstArticle?: boolean | null | undefined;
    title: string | undefined;
    content: BlocksContent; // Or a more appropriate type if your content is structured
    coverImage?: string; // Optional cover image
    datePublished: any;
    tag?: Enum_Article_Tag | null | undefined; // Optional tag
    HOST_URL?: string; // It's common to keep the host URL separate from post data
    authorName?: string;
    avatarURL?: string; // Optional avatar URL
    slug: string | undefined;
}

export default function FullBlogCard(article: BlogPost) {
    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            month: "long",
            day: "numeric",
            year: "numeric",
        };
        return date.toLocaleDateString("en-US", options);
    }

    return (
        <BlogCard
            className={
                article.firstArticle
                    ? "m-3 mt-10 w-full pb-5"
                    : "m-[1%] mb-5 min-w-80 max-w-[30%] grow pb-5"
            }
            key={article.key}
        >
            <BlogCardHeader>
                <BlogCardContent>
                    {article.coverImage && (
                        <img
                            src={article.coverImage}
                            alt={article.coverImage}
                            className="m-0 aspect-video max-h-[250px] w-full object-cover p-0"
                        />
                    )}
                    <div className="m-5">
                        <div className="flex">
                            <p className="w-fit rounded-md bg-primary p-2 text-center text-xs text-white">
                                {article.tag ? article.tag : "General"}
                            </p>
                            <p className="w-fit p-2 text-center text-xs text-white">
                                {formatDate(article.datePublished)}
                            </p>
                        </div>
                        <BlogCardTitle className="my-2">
                            <Link
                                className="hover:underline"
                                href={"/blog/" + article.slug}
                            >
                                {article.title}
                            </Link>
                        </BlogCardTitle>
                        <BlockRendererClient content={article.content} />
                    </div>
                </BlogCardContent>
            </BlogCardHeader>
            <Link href={"/blog/" + article.slug} className="m-5 text-primary">
                Read more →
            </Link>
        </BlogCard>
    );
}
