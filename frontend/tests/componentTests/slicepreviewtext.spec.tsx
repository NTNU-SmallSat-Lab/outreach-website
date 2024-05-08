import { test, expect } from "@playwright/experimental-ct-react";
import { slicePreviewText } from "@/lib/SlicePreviewText";
import { BlocksContent } from "@strapi/blocks-react-renderer";

test("Check SlicePreviewText function", async () => {
    // Mock content with a paragraph block
    const mockContent: BlocksContent = [
        {
            type: "heading",
            children: [
                {
                    type: "text",
                    text: "Lorem ipsum",
                },
            ],
            level: 1,
        },
        {
            type: "paragraph",
            children: [
                {
                    type: "text",
                    text: "",
                },
            ],
        },
        {
            type: "paragraph",
            children: [
                {
                    type: "text",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pulvinar viverra diam. Aliquam venenatis fermentum nisl, ut pulvinar nunc consectetur ac. Nunc sit amet velit nibh. Sed sagittis mauris in elit varius aliquet. Phasellus lacus risus, suscipit sed nisl ac, consectetur faucibus est. Curabitur porta ante nec tortor finibus venenatis. Etiam ac nulla vitae est dapibus tincidunt. Quisque mollis pulvinar bibendum.",
                },
            ],
        },
        {
            type: "paragraph",
            children: [
                {
                    type: "text",
                    text: "Do not slice this paragraph, only the first one",
                },
            ],
        },
    ];

    const slicedText = slicePreviewText(mockContent);

    // Assert that the sliced text contains the expected content
    expect(slicedText).toContain(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pulvinar viverra diam. Aliquam v...",
    );
});
