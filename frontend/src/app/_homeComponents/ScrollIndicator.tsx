"use client";
import { motion, useScroll } from "framer-motion";
import React, { useEffect, useRef } from "react";
import type { SVGProps } from "react";
import { inView } from "framer-motion";

/**
 * Renders a arrow pointing down to indicate that the user can scroll down.
 */
export default function ScrollIndicator() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        if (ref.current) {
            inView(ref.current, () => {
                return () => {
                    ref.current?.style.setProperty(
                        "display",
                        "none",
                        "important",
                    );
                };
            });
        }
    }, []);

    return (
        <motion.div
            ref={ref}
            transition={{ duration: 0.3 }}
            style={{ opacity: scrollYProgress }}
            className="absolute -bottom-3 z-50 hidden self-center text-center md:block"
        >
            <UiwDown
                className={
                    "h-14 w-14 -translate-x-1/2 animate-bounce text-white text-opacity-30"
                }
            />
        </motion.div>
    );
}

export function UiwDown(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 20 20"
            {...props}
        >
            <path
                fill="currentColor"
                d="M10.103 12.778L16.81 6.08a.69.69 0 0 1 .99.012a.726.726 0 0 1-.012 1.012l-7.203 7.193a.69.69 0 0 1-.985-.006L2.205 6.72a.727.727 0 0 1 0-1.01a.69.69 0 0 1 .99 0z"
            ></path>
        </svg>
    );
}
