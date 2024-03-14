"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import Hero from "@/components/ui/hero";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function HeroWithAnimation() {
    useGSAP(() => {
        gsap.fromTo(
            "#rocket",
            { y: 100, rotation: 45, zIndex: 1 },
            {
                y: -200,
                x: 300,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: "#rocket",
                    start: "top center",
                    end: "bottom top",
                    scrub: true,
                },
            },
        );
    });

    function handleClick(): void {
        gsap.to(window, { duration: 1, scrollTo: "#about-us" });
    }

    return (
        <Hero
            id="intro-hero"
            title={"SmallSatLab"}
            description={"We launch satellites 🚀"}
            buttonText={"About us"}
            buttonLink=""
            className="z-10 flex min-h-[calc(100vh-72px)] flex-col justify-center"
            handleClick={handleClick}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                id="rocket"
                src="/images/rocketLaunch.gif"
                alt="rocket launching"
                className=""
            />
        </Hero>
    );
}
