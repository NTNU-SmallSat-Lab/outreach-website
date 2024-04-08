import {
    BlogCard,
    BlogCardFooter,
    BlogCardHeader,
    BlogCardTitle,
} from "@/components/ui/blogCard";

import BlockRendererClient from "./BlockRendererClient";
import { Enum_Article_Tag } from "@/__generated__/graphql";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BlogPost {
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

export default function FullBlogCard({
    article,
    className,
}: {
    article: BlogPost;
    className?: string;
}) {
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
        <BlogCard className={cn(className)}>
            <BlogCardHeader>
                <div className="flex items-center gap-2">
                    {/* Tags */}
                    <p className="rounded-md bg-primary p-2 text-center text-xs text-white">
                        {article.tag ? article.tag : "General"}
                    </p>
                    {/* Date published */}
                    <p className="text-xs text-white">
                        {formatDate(article.datePublished)}
                    </p>
                </div>
                <BlogCardTitle>
                    <Link
                        className="hover:underline"
                        href={"/blog/" + article.slug}
                    >
                        {article.title}
                    </Link>
                </BlogCardTitle>
            </BlogCardHeader>
            {/* <BlogCardContent>
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
            </BlogCardContent> */}
            <BlogCardFooter>
                <Link href={"/blog/" + article.slug} className="text-primary">
                    Read more →
                </Link>
            </BlogCardFooter>
        </BlogCard>
    );
}
