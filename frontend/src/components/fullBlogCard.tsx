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
    return (
        <BlogCard className="m-3 w-1/4 min-w-80" key={article.key}>
            <BlogCardHeader>
                <BlogCardContent>
                    {article.coverImage && (
                        <img
                            src={article.coverImage}
                            alt={article.coverImage}
                            className="m-0 aspect-video w-full object-cover p-0"
                        />
                    )}
                    <div className="m-5">
                        <div className="flex">
                            <p className="w-fit rounded-md bg-ntnuBlue p-2 text-center text-xs text-white">
                                {article.tag ? article.tag : "No tag"}
                            </p>
                            <p className="w-fit p-2 text-center text-xs text-white">
                                {article.datePublished} by {article.authorName}
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
        </BlogCard>
    );
}
