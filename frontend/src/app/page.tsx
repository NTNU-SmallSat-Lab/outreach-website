import { Button } from "@/components/ui/button";
import ColoredSection from "@/components/ui/coloredSection";
import Hero from "@/components/ui/hero";
import Image from "next/image";

export default function Home() {
    return (
        <main>
            <Hero
                title={"SmallSatLab"}
                description={"We launch satellites"}
                buttonText={"About us"}
                buttonLink={""}
                className="min-h-[calc(100vh-74px)]"
            ></Hero>
            <div className="flex flex-col items-center text-center">
                <div className="">
                    <div className="prose">
                        <h1>
                            Empowering Space Exploration One Satellite at a Time
                        </h1>
                    </div>
                    <div className="flex flex-row">
                        <Image
                            src="https://cdn.mos.cms.futurecdn.net/ivDMoYPyqyUHYyiKjkAeK3.jpg"
                            alt="satellite in orbit"
                            width={250}
                            height={250}
                        ></Image>
                        <div className="flex flex-col ">
                            <div className="prose">
                                <p>
                                    NTNU Small Satellite Lab is an initiative to
                                    strenghten the small satellite and space
                                    related activities at NTNU and make them
                                    more visible. At the lab, we have a group
                                    consisting of about ten PhD-students, two
                                    post.docs and many bachelor- and master
                                    students every semester. Physically, the lab
                                    consists of a concurrent design work space
                                    as well as an well-equiped ESD-safe area for
                                    development and testing of electronic and
                                    mechanical parts for payloads and platforms.
                                </p>
                            </div>
                            <Button>Read more</Button>
                        </div>
                    </div>
                </div>
            </div>
            <ColoredSection className="pt-8 items-center text-center flex flex-col">
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
                </div>
            </ColoredSection>
        </main>
    );
}
