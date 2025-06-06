"use client";

import React, { useState, useEffect, useRef } from "react";

export interface ScrollBarThumbProps {
    scrollBarThumbWidth: number;
    svgContainerRect: { topLeft: number; width: number; height: number };
    /* eslint-disable no-unused-vars*/
    handleChartScroll: (
        thumbX: number,
        svgContainerRect: ScrollBarThumbProps["svgContainerRect"],
    ) => void;
    /* eslint-enable no-unused-vars*/
}

const ScrollBarThumb: React.FC<ScrollBarThumbProps> = ({
    scrollBarThumbWidth,
    svgContainerRect,
    handleChartScroll,
}) => {
    const isDragging = useRef<boolean>(false);
    {
        /* SB is used for ScrollBar */
    }
    const [sBThumbX, setSBThumbX] = useState(0);
    const thumbRef = useRef<SVGRectElement>(null);
    // Distance between the left of the thumb and the mouse click
    const distThumbClick = useRef<number | null>(null);

    /* Be careful useEffect runs before parent props are received */
    useEffect(() => {
        const handleMouseUp = () => {
            if (thumbRef.current) {
                isDragging.current = false;
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging.current && thumbRef.current) {
                // Scrollbar starts at the right of the svg container and goes to the left by increasing SBThumbX
                setSBThumbX(() => {
                    // Calculating min and max x positions following the SBThumbX axis for moving the thumb with mouse movement
                    const minX = 0.5;
                    const maxX = svgContainerRect.width - scrollBarThumbWidth;
                    // newPos represents left border of the thumb
                    const newPos =
                        svgContainerRect.topLeft +
                        svgContainerRect.width -
                        scrollBarThumbWidth -
                        (e.clientX -
                            (distThumbClick.current
                                ? distThumbClick.current
                                : 0));

                    // If mouse movement isn't in the scrollable area
                    if (newPos <= minX) {
                        return minX;
                    } else if (newPos >= maxX) {
                        return maxX;
                    }
                    return newPos;
                });

                // Change the displayed data on the chart
                handleChartScroll(
                    Math.round(
                        thumbRef.current.getBoundingClientRect().x * 10,
                    ) / 10,
                    svgContainerRect,
                );
            }
        };

        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mousemove", handleMouseMove);

        // Managing the resize of the thumb
        if (
            thumbRef.current &&
            thumbRef.current.getBoundingClientRect().x <
                svgContainerRect.topLeft
        ) {
            setSBThumbX(svgContainerRect.width - scrollBarThumbWidth);
        }

        return () => {
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [scrollBarThumbWidth, svgContainerRect, handleChartScroll]);

    const handleMouseDown = (
        e: React.MouseEvent<SVGRectElement, MouseEvent>,
    ) => {
        // If the thumb is clicked with left mouse button, we start dragging
        if (thumbRef.current && e.button === 0) {
            isDragging.current = true;
            distThumbClick.current =
                e.clientX - thumbRef.current.getBoundingClientRect().left;
        }
    };

    return (
        <>
            <g
                className="scrollbar-thumb"
                transform={`translate(${20 + svgContainerRect.width - scrollBarThumbWidth - sBThumbX}, 0)`}
            >
                <rect
                    x="0.5"
                    y="-50.5"
                    width={scrollBarThumbWidth}
                    height="50"
                    fill="#cccccc"
                    opacity="0.1"
                />
                <rect
                    ref={thumbRef}
                    x="0.5"
                    y="0.5"
                    width={scrollBarThumbWidth}
                    height={svgContainerRect.height - 1}
                    fill="#cccccc"
                    style={{ cursor: "pointer" }}
                    onMouseDown={handleMouseDown}
                />
                <path
                    d={`M ${scrollBarThumbWidth / 2} ${(svgContainerRect.height - 1) * 0.25} L ${scrollBarThumbWidth / 2} ${(svgContainerRect.height - 1) * 0.75}
                M ${scrollBarThumbWidth * 0.5 - svgContainerRect.width * 0.005} ${(svgContainerRect.height - 1) * 0.25} L ${scrollBarThumbWidth * 0.5 - svgContainerRect.width * 0.005} ${(svgContainerRect.height - 1) * 0.75}
                M ${scrollBarThumbWidth * 0.5 + svgContainerRect.width * 0.005} ${(svgContainerRect.height - 1) * 0.25} L ${scrollBarThumbWidth * 0.5 + svgContainerRect.width * 0.005} ${(svgContainerRect.height - 1) * 0.75}`}
                    fill="none"
                    stroke="#333333"
                    style={{ cursor: "pointer" }}
                    onMouseDown={handleMouseDown}
                />
            </g>
        </>
    );
};

export default ScrollBarThumb;
