"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ProjectCarousel() {
    const projects = ["Allah", "Wallah", "Inshallah"];
    const [projectOrder, setProjectOrder] = useState(projects);
    const [isRotating, setIsRotating] = useState(false);
    const [direction, setDirection] = useState('');

    // Effect to handle automatic reset of the carousel offset after rotation
    useEffect(() => {
        if (isRotating) {
            const timeout = setTimeout(() => {
                setIsRotating(false);
                setDirection('');
            }, 500);  // Timeout should match the animation duration
            return () => clearTimeout(timeout);
        }
    }, [isRotating]);

    const handleDragEnd = (event: any, info: { offset: { x: any; }; velocity: { x: any; }; }) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;
        const threshold = 100; // Drag threshold

        if (offset < -threshold || velocity < -500) {
            setDirection('left');
            rotateProjects('left');
        } else if (offset > threshold || velocity > 500) {
            setDirection('right');
            rotateProjects('right');
        }
    };

    const rotateProjects = (direction: string) => {
        setIsRotating(true);
        if (direction === 'left') {
            setProjectOrder(prev => [...prev.slice(1), prev[0]]);
        } else {
            setProjectOrder(prev => [prev[prev.length - 1], ...prev.slice(0, -1)]);
        }
    };

    return (
        <>
            <div className="flex w-full flex-col justify-center bg-black bg-opacity-50 px-8 py-12">
                <div className="flex w-full flex-col items-center p-4 text-center">
                    <div className="prose prose-invert">
                        <h1>Projects</h1>
                        <p>Here are some of our projects</p>
                    </div>
                </div>

                <div className="flex w-full overflow-hidden">
                    <motion.div
                        drag="x"
                        onDragEnd={handleDragEnd}
                        className="flex gap-4 cursor-grab w-full"
                        dragConstraints={{ left: 0, right: 0 }}
                        animate={{ x: isRotating ? (direction === 'left' ? '-33.33vw' : '33.33vw') : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {projectOrder.map((title, index) => (
                            <ProjectCard key={title} title={title} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </>
    );
}

// A reusable component for project cards
function ProjectCard({ title }: { title: string }) {
    return (
        <motion.div
            layout  // Enable automatic layout animations
            className="flex h-full w-full flex-col border-2 bg-white hover:border-primary"
            whileHover={{ scale: 1.05 }}
            style={{ flex: "0 0 33.33vw" }}  // Make each card take up one-third of the viewport width
        >
            <div className="relative h-[30vh] w-full">
                <img
                    src={`https://via.placeholder.com/300?text=${title}`}
                    alt="Project Image"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="prose p-4">
                <h2 className="mb-2">{title}</h2>
                <p className="break-words">Project Content</p>
            </div>
        </motion.div>
    );
}
