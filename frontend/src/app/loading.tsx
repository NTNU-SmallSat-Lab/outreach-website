import React from "react";
import styles from "./loading.module.css";

/**
 * Renders a loading spinner.
 */
export default function Loading() {
    return (
        <div className="flex grow items-center justify-center">
            <svg
                className="h-1/4 w-1/4"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="circles">
                    <circle id="big" cx="50" cy="50" r="30" fill="#010101" />
                    <circle
                        id={styles.small}
                        cx="90"
                        cy="50"
                        r="5"
                        fill="#010101"
                    />
                </g>
            </svg>
        </div>
    );
}
