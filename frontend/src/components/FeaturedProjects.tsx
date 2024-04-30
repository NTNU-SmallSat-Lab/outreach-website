import fetchFeaturedProjects from "@/lib/data/fetchFeaturedProjects";
import FeaturedProjectCard from "@/components/FeaturedProjectCard";
import Link from "next/link";
import { Button } from "./shadcn/button";

export default async function FeaturedProjects() {
    const featuredProjects = await fetchFeaturedProjects();

    return (
        <>
            <div className="flex w-full flex-col justify-center py-12 sm:px-52">
                <div className="flex w-full flex-col items-center p-4 pt-0 text-center sm:items-start sm:text-left">
                    <div className="prose prose-invert">
                        <h1>
                            {featuredProjects.title
                                ? featuredProjects.title
                                : "Projects"}
                        </h1>
                        <p className="mb-2">
                            {featuredProjects.textContent
                                ? featuredProjects.textContent
                                : "Here are some of our projects"}
                        </p>
                        <Link href={"/projects"} className="mt-0">
                            <Button
                                variant={"link"}
                                size={"link"}
                                className="mt-0"
                            >
                                View all projects
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="mt-8 flex w-full flex-col px-8 sm:px-0">
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
                        {featuredProjects.featuredProjects.map(
                            (project: any, index: number) => {
                                return (
                                    <FeaturedProjectCard
                                        key={index}
                                        title={project.title}
                                        content={project.content}
                                        imageURL={project.imageURL}
                                        projectSlug={project.projectSlug}
                                    />
                                );
                            },
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
