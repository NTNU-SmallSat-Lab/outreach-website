import {
    BlogCard,
    BlogCardContent,
    BlogCardHeader,
    BlogCardTitle,
} from "@/components/ui/blogCard";
import Link from "next/link";
import { SlicePreviewText } from "./SlicePreviewText";
import { BlogPost } from "@/app/blog/page";
import Image from "next/image";
import { SVGProps } from "react";

export function OuiImage(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={60}
            height={60}
            viewBox="0 0 16 16"
            {...props}
        >
            <path
                fill="white"
                d="M6 5a2 2 0 1 1-4 0a2 2 0 0 1 4 0m9-4a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm-3.448 6.134l-3.76 2.769a.5.5 0 0 1-.436.077l-.087-.034l-1.713-.87L1 11.8V14h14V9.751zM15 2H1v8.635l4.28-2.558a.5.5 0 0 1 .389-.054l.094.037l1.684.855l3.813-2.807a.5.5 0 0 1 .52-.045l.079.05L15 8.495z"
            ></path>
        </svg>
    );
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
                    {article.coverImage ? (
                        <Image
                            src={article.coverImage}
                            alt={article.coverImage}
                            width={500}
                            height={0}
                            className="m-0 aspect-video max-h-[250px] w-full object-cover p-0"
                        />
                    ) : (
                        <div className="m-0 flex aspect-video max-h-[250px] w-full items-center justify-center">
                            <OuiImage />
                        </div>
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
