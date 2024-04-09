"use client";

import React, { useEffect, useState } from "react";

import {
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon,
} from "next-share";

export default function ShareButtons() {
    const [currentUrl, setCurrentUrl] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentUrl(window.location.href);
        }
    }, []);

    console.log(window.location.href);

    return (
        <div>
            <FacebookShareButton url={currentUrl}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <LinkedinShareButton url={currentUrl}>
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <TwitterShareButton url={currentUrl}>
                <TwitterIcon size={32} round />
            </TwitterShareButton>
        </div>
    );
}
