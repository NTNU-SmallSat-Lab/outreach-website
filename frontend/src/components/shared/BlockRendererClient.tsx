"use client";
import NextImage from "next/image";

import {
    BlocksRenderer,
    type BlocksContent,
} from "@strapi/blocks-react-renderer";

export default function BlockRendererClient({
    content,
}: {
    readonly content: BlocksContent;
}) {
    if (!content) return null;
    return (
        <div className="prose prose-invert lg:prose-xl">
            <BlocksRenderer
                content={content}
                blocks={{
                    image: ({ image }) => {
                        return (
                            <NextImage
                                src={image.url}
                                width={image.width}
                                className="object-contain"
                                height={image.height}
                                alt={image.alternativeText || ""}
                            />
                        );
                    },
                    heading: ({ children, level }) => {
                        switch (level) {
                            case 1:
                                return <h1>{children}</h1>;
                            case 2:
                                return <h2>{children}</h2>;
                            case 3:
                                return <h3>{children}</h3>;
                            case 4:
                                return <h4>{children}</h4>;
                            case 5:
                                return <h5>{children}</h5>;
                            default:
                                return <h1>{children}</h1>;
                        }
                    },

                    paragraph: ({ children }) => {
                        const child = children as {
                            props: {
                                type: "text";
                                text: string;
                                italic: boolean;
                            };
                        }[];
                        const text = child[0]?.props.text;
                        //Children with text have testid, excluding videoes and linebreaks.
                        if (text == "") {
                            return <p>{children}</p>;
                        }
                        return <p data-testid="blockParagraph">{children}</p>;
                    },

                    link: ({ url, children }) => {
                        // Check if the URL is a valid YouTube video link
                        const isYouTubeVideo = url.includes("youtube.com");
                        // Render the iframe only if it's a YouTube video link
                        if (isYouTubeVideo) {
                            return (
                                <div className="flex w-full items-center">
                                    <iframe
                                        width={"100%"}
                                        className="aspect-video"
                                        src={url}
                                        title="YouTube video"
                                    ></iframe>
                                </div>
                            );
                        } else {
                            // If it's not a video link, return an anchor with the href
                            return (
                                <a href={url} target="_blank">
                                    {children}
                                </a>
                            );
                        }
                    },
                }}
            />
        </div>
    );
}
