"use client";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import React from "react";
function ScrollLinkedDiv({
    transformOrigin = "left",
}: {
    transformOrigin?: string;
}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["end end", "start start"],
    });

    return (
        <motion.div
            className="h-[1px] place-self-start self-start bg-white bg-opacity-50"
            style={{
                scaleX: scrollYProgress,
                transformOrigin: transformOrigin,
            }}
            initial={{ scaleX: 0 }}
            ref={ref}
        />
    );
}

function WindowScrollLinkedDiv({ children }: { children?: React.ReactNode }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["end end", "start start"],
    });
    return (
        <>
            <motion.div
                className="h-[1px] place-self-start self-start bg-white bg-opacity-50"
                style={{
                    scaleX: scrollYProgress,
                    transformOrigin: "left",
                }}
                initial={{ scaleX: 0 }}
                ref={ref}
            />
            {children}
            <motion.div
                className="h-[1px] place-self-start self-start bg-white bg-opacity-50"
                style={{
                    scaleX: scrollYProgress,
                    transformOrigin: "right",
                }}
                initial={{ scaleX: 0 }}
            />
        </>
    );
}

export { ScrollLinkedDiv, WindowScrollLinkedDiv };
