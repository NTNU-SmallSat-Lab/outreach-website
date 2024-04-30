import { ProjectPost } from "@/app/projects/page";
import { SlicePreviewText } from "./SlicePreviewText";
import Link from "next/link";
import Image from "next/image";
import {
    BlogCard,
    BlogCardContent,
    BlogCardHeader,
    BlogCardTitle,
} from "@/components/ui/blogCard";

const STRAPI_URL = process.env.BACKEND_INTERNAL_URL;

export default function ProjectCards({
    projects,
}: {
    projects: ProjectPost[] | null;
}) {
    if (!projects || projects.length === 0) {
        return <div>There are no projects to display</div>;
    }
    console.log(projects);

    return (
        <>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {projects?.map((project: ProjectPost) => {
                    return (
                        <Link
                            href={"/projects/" + project.attributes?.slug}
                            className="flex flex-col border bg-background p-5 text-card-foreground hover:border-primary"
                        >
                            <BlogCard>
                                <BlogCardHeader>
                                    {project?.attributes?.previewImage?.data
                                        ?.attributes?.url ? (
                                        <Image
                                            src={
                                                STRAPI_URL +
                                                project.attributes.previewImage
                                                    .data.attributes.url
                                            }
                                            alt={project.attributes.title}
                                            width={500}
                                            height={0}
                                            className="aspect-video max-h-[500px] w-full object-cover"
                                        />
                                    ) : null}
                                    <BlogCardTitle>
                                        {project.attributes?.title}
                                    </BlogCardTitle>
                                </BlogCardHeader>
                                <BlogCardContent>
                                    <p className="break-words">
                                        {SlicePreviewText(
                                            project.attributes.content,
                                        )}
                                    </p>
                                </BlogCardContent>
                            </BlogCard>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}
