import { BlocksContent } from "@strapi/blocks-react-renderer";

/**
 * Returns a preview text by slicing the content of the first paragraph block.
 * If the text exceeds 100 characters, it appends "..." at the end.
 *
 * @param content - The BlocksContent to extract the preview text from.
 * @returns The preview text.
 */
function slicePreviewText(content: BlocksContent): string {
    let text = "";
    for (const block of content) {
        if (block.type === "paragraph") {
            const paragraphBlock = block as {
                type: "paragraph";
                children: { type: "text"; text: string }[];
            };

            if (paragraphBlock.children[0].text == "") {
                continue;
            }

            text = paragraphBlock.children[0].text.slice(0, 100);

            if (text.length < paragraphBlock.children[0].text.length) {
                text += "...";
            }

            break;
        }
    }
    return text;
}

export { slicePreviewText };
