import {
    Card,
    CardContent,
    CardTitle,
    CardHeader,
    CardFooter,
} from "@/components/shadcn/card";
import Link from "next/link";
import Image from "next/image";

export default function FeaturedProjectCard({
    title,
    content,
    imageURL,
    projectSlug,
}: {
    title: string | undefined;
    content: any | undefined;
    imageURL: string | undefined;
    projectSlug: string | undefined;
}) {
    if (!title || !content || !imageURL || !projectSlug) {
        return null;
    }

    console.log(content);

    return (
        <Link href={"/projects/" + projectSlug}>
            <div className="flex h-full w-full flex-col border-2 bg-red-600 hover:border-blue-500">
                <Image
                    src={imageURL}
                    alt="Project Image"
                    width={500}
                    height={500}
                />
                <div className="prose prose-invert text-center">
                    {" "}
                    <h1 className="mb-2 mt-6">{title}</h1>
                    <p className="break-words">{content}</p>
                </div>
            </div>
        </Link>
    );
}
