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
            const Heading = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
            return <Heading className = "">{children}</Heading>
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