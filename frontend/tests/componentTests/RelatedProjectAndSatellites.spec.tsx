import RelatedProjectsAndSatellites from "@/components/RelatedProjectsAndSatellites";
import { test, expect } from "@playwright/experimental-ct-react";

test("should work", async ({ mount }) => {
    // Mock project data
    const mockProject = {
        id: "test",
        title: "Learn React",
        previewImage: "test",
        slug: "test",
        isProject: true,
        // Add other required properties
    };

    const component = await mount(
        <RelatedProjectsAndSatellites project={mockProject} />,
    );

    await expect(component).toContainText("Learn React");
});
