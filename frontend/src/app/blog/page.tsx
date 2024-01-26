export const dynamic = "force-dynamic";
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
import { getAllArticles } from "@/lib/strapi";
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";

export default async function BlogPage() {
    const response = await getAllArticles();
    const data: components["schemas"]["ArticleListResponseDataItem"][] =
        response.data;

    console.log(response.data);

    return (
        <div>
            <h1 className="text-4xl font-extrabold">Blog</h1>
            <p className="text-sm text-muted-foreground">
                News and other short stories about our activities are shown
                here.
            </p>
            <div className="flex flex-col gap-4 mt-4">
                {data.map((article) => {
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
                            <CardFooter className="flex-row gap-2">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                {
                                    article.attributes?.author?.data?.attributes
                                        ?.name
                                }
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
