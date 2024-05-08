// Import necessary dependencies
import { test, expect } from "@playwright/experimental-ct-react";
import ShareButtons from "@/app/blog/[articleSlug]/ShareButtons";

// Define the test
test("Check ShareButtons component", async ({ mount }) => {
    // Mock slug
    const slug = "test-slug";

    // Mount the ShareButtons component
    const component = await mount(<ShareButtons slug={slug} />);

    // Check if Facebook icon is rendered
    const facebookButton = component.getByLabel("facebook");
    await expect(facebookButton).toBeVisible();

    // Check if Linkedin icon is rendered
    const linkedinButton = component.getByLabel("linkedin");
    await expect(linkedinButton).toBeVisible();

    // Check if Twitter icon is rendered
    const twitterButton = component.getByLabel("twitter");
    await expect(twitterButton).toBeVisible();
});
