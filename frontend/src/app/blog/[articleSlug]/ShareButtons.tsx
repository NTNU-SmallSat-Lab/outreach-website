"use client";

import {
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon,
} from "next-share";

export default function ShareButtons({ slug }: { slug: String }) {
    return (
        <>
            <FacebookShareButton
                url={`http://web.hypso.ies.ntnu.no:3000/blog/${slug}`}
            >
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <LinkedinShareButton
                url={`http://web.hypso.ies.ntnu.no:3000/blog/${slug}`}
            >
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <TwitterShareButton
                url={`http://web.hypso.ies.ntnu.no:3000/blog/${slug}`}
            >
                <TwitterIcon size={32} round />
            </TwitterShareButton>
        </>
    );
}
