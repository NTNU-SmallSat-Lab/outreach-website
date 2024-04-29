import fetchFeaturedProjects from "@/lib/data/fetchFeaturedProjects";
import FeaturedProjectCard from "@/components/FeaturedProjectCard";
import Link from "next/link";
import { Button } from "./shadcn/button";

export default async function FeaturedProjects() {
    const featuredProjects = await fetchFeaturedProjects();

    console.log(featuredProjects.featuredProjects);

    return (
        <div className="flex w-full flex-col justify-center bg-black bg-opacity-50 px-8 py-12 sm:flex-row">
            <div className="prose prose-invert relative left-32 flex w-full flex-col p-4 text-center sm:w-1/5 sm:text-left">
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
                    <Button variant={"link"} size={"link"}>View more</Button>
                </Link>
            </div>

            <div className="relative left-64 flex w-full flex-col sm:w-4/5">
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
    );
}
