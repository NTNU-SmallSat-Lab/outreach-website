import { BlocksContent } from "@strapi/blocks-react-renderer";

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
