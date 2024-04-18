import { Button } from "@shadcn/button";
import ColoredSection from "@/components/ui/coloredSection";

import Image from "next/image";
import Link from "next/link";

import fetchFeaturedImage from "@/lib/data/fetchFeaturedImage";

import SatelliteDataHome from "@/components/satelliteData/SatelliteDataHome";
import SatelliteSelector from "@/components/homeComponents/SatelliteSelector";
import dynamic from "next/dynamic";
import HeroWrapper from "@/components/HeroWrapper";

const SatelliteGlobeNoSSR = dynamic(
    () => import("@/components/homeComponents/homeGlobe"),
    {
        ssr: false,
    },
);

export default async function Home() {
    const featuredImageURL = await fetchFeaturedImage();

    return (
        <>
            <div className="flex min-h-[calc(100vh-73px)] flex-col gap-0 sm:flex-row">
                {/* Stats Container */}
                <div className="z-10 flex w-full flex-col  border-b-2 border-l-2 border-r-2 border-t-2 border-gray-600 bg-black md:min-w-[500px] xl:w-1/3">
                    <SatelliteSelector />
                    <SatelliteDataHome />
                </div>

                {/* Globe Container */}
                <div className="z-0 w-full overflow-x-hidden border-b-2  border-l-2 border-r-2 border-t-0 border-gray-600 sm:border-l-0 sm:border-t-2 xl:w-2/3">
                    <div className="flex h-full items-center justify-center ">
                        <SatelliteGlobeNoSSR />
                    </div>
                </div>
            </div>

            <ColoredSection
                id="about-us"
                className="flex flex-col items-center px-8 py-12"
            >
                <div className="prose prose-invert flex flex-col items-center text-center prose-img:rounded-xl">
                    <h1>
                        Empowering Space Exploration One Satellite at a Time
                    </h1>

                    <div className="relative h-[300px] w-[300px]">
                        <Image
                            alt="Satellite in orbit"
                            src="/images/satellite.jpg"
                            className="m-0 object-fill"
                            layout="fill"
                        />
                    </div>
                    <div className="col-span-2 flex flex-col items-center gap-4 lg:col-span-2 ">
                        <div className=" self-center">
                            <p>
                                NTNU Small Satellite Lab is an initiative to
                                strenghten the small satellite and space related
                                activities at NTNU and make them more visible.
                                At the lab, we have a group consisting of about
                                ten PhD-students, two post.docs and many
                                bachelor- and master students every semester.
                                Physically, the lab consists of a concurrent
                                design work space as well as an well-equiped
                                ESD-safe area for development and testing of
                                electronic and mechanical parts for payloads and
                                platforms.
                            </p>
                        </div>
                    </div>
                </div>
            </ColoredSection>
            <div className="flex flex-col items-center px-8 py-12 text-center">
                <div className="prose prose-invert">
                    <h1 className="">Projects</h1>
                    <p className="">
                        The SmallSat Lab team is part of a variety of projects,
                        a selection listed below. The main effort is on our two
                        satellites; HYPSO-1 (launched January 2022) and HYPSO-2
                        (expected to launch June 2024) - which you can read more
                        about by visiting hypso.space. Activities and research
                        topics include spacecraft- and systems engineering in an
                        university setting, development of hyperspectral camera
                        systems, onboard processing including autonomy and AI,
                        communication infrastructure for small satellites and
                        other satellite autonomous sensor platforms.
                    </p>
                    <Link href={"/projects"}>
                        <Button id="">View more</Button>
                    </Link>
                </div>
            </div>

            <ColoredSection className="flex flex-col items-center px-8 py-12">
                <div className="prose prose-invert flex flex-col items-center text-center prose-img:rounded-xl">
                    <h1 className="">Featured Satellite Image</h1>
                    {featuredImageURL}
                </div>
            </ColoredSection>

            <HeroWrapper></HeroWrapper>
        </>
    );
}
