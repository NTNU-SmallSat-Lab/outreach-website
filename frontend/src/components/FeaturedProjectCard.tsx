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

    return (
        <Link href={"/projects/" + projectSlug}>
            <div className="flex h-full w-full flex-col border-2 bg-white hover:border-blue-500">
                <div className="relative h-[30vh] w-full">
                    <Image
                        src={imageURL}
                        alt="Project Image"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="prose p-4">
                    <h2 className="mb-2">{title}</h2>
                    <p className="break-words">{content}</p>
                </div>
            </div>
        </Link>
    );
}
