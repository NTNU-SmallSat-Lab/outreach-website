import { test, expect } from "@playwright/experimental-ct-react";
import BlockRendererClient from "@/components/BlockRendererClient";
import { BlocksContent } from "@strapi/blocks-react-renderer";

test("Check content rendering in BlockRendererClient", async ({ mount }) => {
    // Mock content data
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
                    text: "Dolor sit amet",
                },
            ],
        },
    ];

    // Mount the BlockRendererClient with mock content
    const component = await mount(
        <BlockRendererClient content={mockContent} />,
    );

    await expect(component.getByRole("heading")).toContainText("Lorem ipsum");
    await expect(component.getByRole("paragraph")).toContainText(
        "Dolor sit amet",
    );
});
