import { Button } from "@shadcn/button";

import Image from "next/image";
import Link from "next/link";

import fetchFeaturedImage from "@/lib/data/fetchFeaturedImage";
import fetchFeaturedProjects from "@/lib/data/fetchFeaturedProjects";
import fetchMissionStatement from "@/lib/data/fetchMissionStatement";

import SatelliteDataHome from "@/components/satelliteData/SatelliteDataHome";
import SatelliteSelector from "@/components/homeComponents/SatelliteSelector";
import dynamic from "next/dynamic";
import HeroWrapper from "@/components/HeroWrapper";

const STRAPI_URL = process.env.BACKEND_INTERNAL_URL;

const SatelliteGlobeNoSSR = dynamic(
    () => import("@/components/homeComponents/homeGlobe"),
    {
        ssr: false,
    },
);

export default async function Home() {
    const missionStatement = await fetchMissionStatement();
    const featuredProjects = await fetchFeaturedProjects();
    const featuredImage = await fetchFeaturedImage();

    let projectURL1 = "";
    if (
        STRAPI_URL &&
        featuredProjects.featuredProject1?.previewImage?.data?.attributes?.url
    ) {
        projectURL1 =
            STRAPI_URL +
            featuredProjects.featuredProject1?.previewImage?.data?.attributes
                ?.url;
    }

    let projectURL2 = "";
    if (
        STRAPI_URL &&
        featuredProjects.featuredProject2?.previewImage?.data?.attributes?.url
    ) {
        projectURL2 =
            STRAPI_URL +
            featuredProjects.featuredProject2?.previewImage?.data?.attributes
                ?.url;
    }

    let projectURL3 = "";
    if (
        STRAPI_URL &&
        featuredProjects.featuredProject3?.previewImage?.data?.attributes?.url
    ) {
        projectURL3 =
            STRAPI_URL +
            featuredProjects.featuredProject3?.previewImage?.data?.attributes
                ?.url;
    }

    return (
        <>
            {/* Intro Section */}
            <div className="flex w-full flex-col justify-center bg-black bg-opacity-50 px-8 py-12 sm:flex-row">
                <div className="prose prose-invert flex w-full flex-col p-4 text-center sm:w-1/2 sm:text-left">
                    <h1>
                        {missionStatement.title
                            ? missionStatement.title
                            : "NTNU SmallSat Lab"}
                    </h1>
                    <p>
                        {missionStatement.textContent
                            ? missionStatement.textContent
                            : "The NTNU SmallSat Lab is a research group at NTNU"}
                    </p>
                </div>

                <div className="flex w-full flex-col items-center justify-center p-4 text-center sm:w-1/2">
                    <div className="w-full overflow-hidden">
                        <Image
                            alt="Featured Satellite Image"
                            src={featuredImage.featuredImageURL}
                            layout="responsive"
                            width={0}
                            height={0}
                            objectFit="contain"
                            className="w-full"
                        />
                    </div>
                    <div className="prose prose-invert p-4">
                        <h2>
                            Image Taken by{" "}
                            <Link
                                href={`/satellites/${featuredImage.imageSatelliteSlug}`}
                                className="text-blue-500 underline"
                            >
                                {featuredImage.imageSatelliteName}
                            </Link>
                        </h2>
                    </div>
                </div>
            </div>

            {/* Projects Section */}
            <div className="flex w-full flex-col justify-center bg-black bg-opacity-50 px-8 py-12 sm:flex-row">
                <div className="flex w-full flex-col items-center justify-center p-4 text-center sm:order-1 sm:w-3/5">
                    <div className="grid h-full min-h-[70vh] w-full grid-cols-3 gap-4">
                        <div className="h-full w-full overflow-hidden bg-red-600">
                            <h1>{featuredProjects?.featuredProject1?.title}</h1>
                            <Image
                                alt="Featured Project 1"
                                src={projectURL1}
                                layout="responsive"
                                width={0}
                                height={0}
                                objectFit="cover"
                            />
                        </div>
                        <div className="h-full w-full bg-green-600">
                            <h1>{featuredProjects?.featuredProject2?.title}</h1>
                            <Image
                                alt="Featured Project 2"
                                src={projectURL2}
                                layout="responsive"
                                width={0}
                                height={0}
                            />
                        </div>
                        <div className="h-full w-full bg-blue-600">
                            <h1>{featuredProjects?.featuredProject3?.title}</h1>
                            <Image
                                alt="Featured Project 3"
                                src={projectURL3}
                                layout="responsive"
                                width={0}
                                height={0}
                            />
                        </div>
                    </div>
                </div>
                <div className="prose prose-invert flex w-full flex-col p-4 text-center sm:order-2 sm:w-2/5 sm:text-left">
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
                    <Link href={"/projects"}>
                        <Button id="">View more</Button>
                    </Link>
                </div>
            </div>

            {/* Globe Section */}
            <div className="flex min-h-[calc(100vh-73px)] flex-col gap-0 sm:flex-row">
                {/* Stats Container */}
                <div className="z-10 flex w-full flex-col border-b-2 border-l-2 border-r-2 border-t-2 border-gray-600 bg-black md:min-w-[500px] xl:w-1/3">
                    <SatelliteSelector />
                    <SatelliteDataHome />
                </div>

                {/* Globe Container */}
                <div className="z-0 h-full w-full overflow-x-hidden  border-b-2 border-l-2 border-r-2 border-t-0 border-gray-600 sm:border-l-0 sm:border-t-2 xl:w-2/3">
                    <div className="flex h-[70vh] items-center justify-center sm:h-full">
                        <SatelliteGlobeNoSSR />
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <HeroWrapper />
        </>
    );
}
