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
            <div className="flex h-full w-full flex-col border-2 bg-black hover:border-primary">
                <div className="relative h-[30vh] max-h-[40vh] w-full sm:h-[30vw]">
                    <Image
                        src={imageURL}
                        alt="Project Image"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="prose prose-invert p-4">
                    <h2 className="mb-2">{title}</h2>
                    <p className="truncate break-words">{content}</p>
                </div>
            </div>
        </Link>
    );
}
