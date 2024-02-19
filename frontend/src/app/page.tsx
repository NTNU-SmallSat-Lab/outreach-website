import { Button } from "@/components/ui/button";
import ColoredSection from "@/components/ui/coloredSection";

import Image from "next/image";
import Link from "next/link";

// Dynamic import because of leaflet and globe.gl ssr problem with next.js
// import dynamic from "next/dynamic";
// import SatelliteFetcher from "@/components/map/SatelliteFetcher";

// const MyCustomMap = dynamic(() => import("@/components/map/MyCustomMap"), {
//     ssr: false,
// });

export default function Home() {
    return (
        <main>
            {/* <SatelliteFetcher />

            <MyCustomMap /> */}

            <ColoredSection
                id="about-us"
                className="flex flex-col items-center py-12 px-8"
            >
                <div className="flex flex-col items-center text-center prose dark:prose-invert prose-img:rounded-xl">
                    <h1>
                        Empowering Space Exploration One Satellite at a Time
                    </h1>

                    <div className="relative w-[300px] h-[300px]">
                        <Image
                            alt="Satellite in orbit"
                            src="/images/satellite.jpg"
                            className="m-0 object-fill"
                            layout="fill"
                        />
                    </div>
                    <div className="flex flex-col gap-4 items-center col-span-2 lg:col-span-2">
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
            <div className="pt-8 items-center text-center flex flex-col py-12 px-8">
                <div className="prose dark:prose-invert">
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
            <ColoredSection className="flex flex-col items-center py-12 px-8">
                <div className="flex flex-col items-center text-center prose dark:prose-invert prose-img:rounded-xl">
                    <h1 className="">Most recent picture</h1>
                    <div className="relative w-[300px] h-[300px]">
                        <Image
                            alt="Satellite image of city"
                            src="/images/recent-image.jpg"
                            className="m-0"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>
            </ColoredSection>
        </main>
    );
}
