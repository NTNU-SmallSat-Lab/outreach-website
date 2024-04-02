import {
    BlogCard,
    BlogCardContent,
    BlogCardHeader,
    BlogCardTitle,
} from "@/components/ui/blogCard";

import Link from "next/link";
import { SlicePreviewText } from "./SlicePreviewText";
import { BlogPost } from "@/app/blog/page";

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
                            <p className="ww-fit rounded-md bg-primary p-2 text-center text-xs text-white">
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
                        <p className="break-words">
                            {SlicePreviewText(article.content)}
                        </p>
                    </div>
                </BlogCardContent>
            </BlogCardHeader>
            <Link href={"/blog/" + article.slug} className="m-5 text-primary">
                Read more →
            </Link>
        </BlogCard>
    );
}
