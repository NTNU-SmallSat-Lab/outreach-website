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
                <BlogCardContent>
                    {article.coverImage && (
                        <Image
                            src={article.coverImage}
                            alt={article.coverImage}
                            width={500}
                            height={0}
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
