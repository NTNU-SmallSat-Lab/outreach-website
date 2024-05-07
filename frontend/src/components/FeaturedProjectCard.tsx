import Link from "next/link";
import Image from "next/image";
import { PlaceholderImage } from "@/components/fullBlogCard";

const STRAPI_URL = process.env.BACKEND_INTERNAL_URL;

export default function FeaturedProjectCard({
    title,
    imageURL,
    projectSlug,
}: {
    title: string;
    imageURL?: string;
    projectSlug?: string;
    key: string;
}) {
    return (
        <Link href={"/projects/" + projectSlug}>
            <div className="flex aspect-square h-full w-full flex-col border-2 bg-black hover:border-primary">
                <div className="w-full">
                    {imageURL ? (
                        <Image
                            src={STRAPI_URL ?? "" + imageURL}
                            alt="Project Image"
                            layout="fill"
                            objectFit="cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center">
                            <PlaceholderImage />
                        </div>
                    )}
                </div>
                <div className="prose prose-invert p-4">
                    <h2 className="mb-2">{title}</h2>
                </div>
            </div>
        </Link>
    );
}
