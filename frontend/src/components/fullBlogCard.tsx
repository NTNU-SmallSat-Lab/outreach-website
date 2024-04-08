import {
    BlogCard,
    BlogCardContent,
    BlogCardFooter,
    BlogCardHeader,
    BlogCardTitle,
} from "@/components/ui/blogCard";
import Link from "next/link";
import { SlicePreviewText } from "./SlicePreviewText";
import { BlogPost } from "@/app/blog/page";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
                {article.coverImage && (
                    <Image
                        src={article.coverImage}
                        alt={article.coverImage}
                        width={500}
                        height={0}
                        className="aspect-video w-full object-cover"
                    />
                )}
                <div className="flex gap-2">
                    <p className="flex items-center rounded-md bg-primary p-2 text-center text-xs text-white">
                        {article.tag ? article.tag : "General"}
                    </p>
                    <p className="flex w-fit items-center text-center text-xs text-white">
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
            <BlogCardContent>
                <p className="break-words">
                    {SlicePreviewText(article.content)}
                </p>
            </BlogCardContent>
            <BlogCardFooter>
                <Link href={"/blog/" + article.slug} className="text-primary">
                    Read more →
                </Link>
            </BlogCardFooter>
        </BlogCard>
    );
}
