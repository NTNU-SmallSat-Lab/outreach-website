"use client";

import { motion } from "framer-motion";

export function FadeLeft({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0}}
            transition={{ duration: 0.5, ease: "easeInOut"}}
        >
            {children}
        </motion.div>
    );
}

export function FadeRight({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0}}
            transition={{ duration: 0.5, ease: "easeInOut"}}
        >
            {children}
        </motion.div>
    );
}