export const runtime = "edge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchArticleBySlug, getAvatarImageUrl } from "@/lib/strapi";
import { components } from "@customTypes/strapi";
import {
    BlocksRenderer,
    type BlocksContent,
} from "@strapi/blocks-react-renderer";

export default async function Page({
    params,
}: {
    params: { articleSlug: string };
}) {
    const response = await fetchArticleBySlug(params.articleSlug);
    const article: components["schemas"]["ArticleListResponseDataItem"] =
        response.data[0];
    const authorName = article.attributes?.author?.data?.attributes?.name;
    let avatarURL = getAvatarImageUrl(
        article.attributes?.author?.data?.attributes?.avatar,
    );

    return (
        <>
            <div className="flex flex-col gap-4 items-center">
                <h1 className="text-4xl font-extrabold">
                    {article.attributes?.title}
                </h1>
                <p className="text-sm text-muted-foreground">
                    {article.attributes?.subtitle}{" "}
                </p>
                <BlocksRenderer
                    content={article.attributes?.body as BlocksContent}
                />

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
                        <p>
                            {article.attributes?.author?.data?.attributes?.name}
                        </p>
                        <p>{article.attributes?.datePublished}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
