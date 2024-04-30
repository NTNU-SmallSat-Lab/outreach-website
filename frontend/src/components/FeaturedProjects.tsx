import fetchFeaturedProjects from "@/lib/data/fetchFeaturedProjects";
import FeaturedProjectCard from "@/components/FeaturedProjectCard";
import Link from "next/link";
import { Button } from "./shadcn/button";

import ProjectCarousel from "@/components/ProjectCarousel";

export default async function FeaturedProjects() {
    const featuredProjects = await fetchFeaturedProjects();

    return (
        <>
            <div className="flex w-full flex-col justify-center bg-black bg-opacity-50 px-8 py-12">
                <div className="flex w-full flex-col items-center p-4 text-center">
                    <div className="prose prose-invert">
                        <h1>
                            {featuredProjects.title
                                ? featuredProjects.title
                                : "Projects"}
                        </h1>
                        <p>
                            {featuredProjects.textContent
                                ? featuredProjects.textContent
                                : "Here are some of our projects"}
                        </p>
                        <Link href={"/projects"} className="">
                            <Button variant={"link"} size={"link"}>
                                View more
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="flex w-full flex-col">
                    <div className="grid w-full grid-cols-3 gap-4">
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

            <ProjectCarousel />
        </>
    );
}
