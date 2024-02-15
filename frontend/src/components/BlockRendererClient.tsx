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
                            return <h1 className="text-4xl mb-4">{children}</h1>
                        case 2:
                            return <h2 className="text-3xl mb-2">{children}</h2>
                        case 3:
                            return <h3 className="text-2xl mb-2">{children}</h3>
                        case 4:
                            return <h4 className="text-xl mb-2">{children}</h4>
                        case 5:
                            return <h5 className="text-lg mb-2">{children}</h5>
                        default:
                            return <h1 className="text-4xl mb-4">{children}</h1>
                    }
                },

                paragraph: ({ children }) => (
                    <>
                        <p className="">{children}</p>
                        <br />
                    </>
                ),
            }}
        />
    );
}
