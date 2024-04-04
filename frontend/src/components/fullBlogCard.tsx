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
        <BlogCard key={article.key}>
            <BlogCardHeader>
                <div className="flex items-center gap-2">
                    <p className="rounded-md bg-primary p-2 text-center text-xs text-white">
                        {article.tag ? article.tag : "General"}
                    </p>
                    <p className=" text-center text-xs text-white">
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
            </BlogCardHeader>
            <BlogCardContent>
                {article.coverImage && (
                    <img
                        src={article.coverImage}
                        alt={article.coverImage}
                        className="aspect-video object-cover"
                    />
                )}
                <div>
                    <BlockRendererClient content={article.content} />
                </div>
            </BlogCardContent>

            <Link href={"/blog/" + article.slug} className="text-primary">
                Read more →
            </Link>
        </BlogCard>
    );
}
