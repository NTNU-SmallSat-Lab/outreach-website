"use client";
import Image from "next/image";

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
        <BlocksRenderer
            content={content}
            blocks={{
                image: ({ image }) => {
                    console.log(image);
                    return (
                        <Image
                            src={image.url}
                            width={500}
                            height={image.height}
                            alt={image.alternativeText || ""}
                        />
                    );
                },
                heading: ({ children, level }) => {
                    switch (level) {
                        case 1:
                            return (
                                <h1 className="mb-4 text-4xl">{children}</h1>
                            );
                        case 2:
                            return (
                                <h2 className="mb-2 text-3xl">{children}</h2>
                            );
                        case 3:
                            return (
                                <h3 className="mb-2 text-2xl">{children}</h3>
                            );
                        case 4:
                            return <h4 className="mb-2 text-xl">{children}</h4>;
                        case 5:
                            return <h5 className="mb-2 text-lg">{children}</h5>;
                        default:
                            return (
                                <h1 className="mb-4 text-4xl">{children}</h1>
                            );
                    }
                },

                paragraph: ({ children }) => (
                    <>
                        <p className="break-words">{children}</p>
                        <br />
                    </>
                ),
            }}
        />
    );
}
