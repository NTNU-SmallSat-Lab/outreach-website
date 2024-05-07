import fetchFeaturedProjects from "@/lib/data/fetchFeaturedProjects";
import Link from "next/link";
import { Button } from "../shadcn/button";
import CardWithContent from "../shared/CardWithContent";

const STRAPI_URL = process.env.BACKEND_INTERNAL_URL;

export default async function FeaturedProjects() {
    const featuredProjects = await fetchFeaturedProjects();

    const threeProjects = [
        featuredProjects?.featuredProject1,
        featuredProjects?.featuredProject2,
        featuredProjects?.featuredProject3,
    ];

    let image_url = undefined;
    if (STRAPI_URL) {
        image_url =
            STRAPI_URL +
            featuredProjects?.featuredProject1?.data?.attributes?.previewImage
                ?.data?.attributes?.url;
    }

    return (
        <>
            <div className="flex w-full flex-col justify-center gap-2 py-12 sm:px-52">
                <div className="flex w-full flex-col items-center p-4 pt-0 text-center sm:items-start sm:text-left">
                    <div className="prose prose-invert">
                        <h1>
                            {featuredProjects?.title
                                ? featuredProjects.title
                                : "Projects"}
                        </h1>
                        <p className="mb-2">
                            {featuredProjects?.textContent
                                ? featuredProjects.textContent
                                : "Here are some of our projects"}
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex w-full flex-col px-8 sm:px-0">
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
                        {threeProjects.map((project, index) => {
                            if (!project?.data?.attributes?.title) {
                                return null;
                            }
                            return (
                                <CardWithContent
                                    key={index.toString()}
                                    title={project?.data?.attributes?.title}
                                    link={
                                        "/projects/" +
                                        project?.data?.attributes?.slug
                                    }
                                    imageURL={image_url}
                                ></CardWithContent>
                            );
                        })}
                    </div>
                </div>
                <Link href={"/projects"} className="mt-0">
                    <Button variant={"link"} size={"link"} className="mt-0">
                        View all projects
                    </Button>
                </Link>
            </div>
        </>
    );
}
