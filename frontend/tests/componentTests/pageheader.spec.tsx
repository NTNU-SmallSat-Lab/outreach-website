import { test, expect } from "@playwright/experimental-ct-react";
import {
    PageHeader,
    PageHeaderAndSubtitle,
    PageSubtitle,
} from "@/components/PageHeader";

// Mock data
const headerText = "Welcome to our Page";
const subtitleText = "Explore our content";

test("PageHeader renders correctly", async ({ mount }) => {
    // Mount the PageHeader component with mock data
    const component = await mount(<PageHeader>{headerText}</PageHeader>);

    // Check if the component is visible
    await expect(component).toBeVisible();

    // Check if the header text is correct
    await expect(component).toContainText(headerText);
});

test("PageSubtitle renders correctly", async ({ mount }) => {
    // Mount the PageSubtitle component with mock data
    const component = await mount(<PageSubtitle>{subtitleText}</PageSubtitle>);

    // Check if the component is visible
    await expect(component).toBeVisible();

    // Check if the subtitle text is correct
    await expect(component).toContainText(subtitleText);
});

test("PageHeaderAndSubtitle renders correctly", async ({ mount }) => {
    // Mount the PageHeaderAndSubtitle component with mock data
    const component = await mount(
        <PageHeaderAndSubtitle>
            <PageHeader>{headerText}</PageHeader>
            <PageSubtitle>{subtitleText}</PageSubtitle>
        </PageHeaderAndSubtitle>,
    );

    // Check if the component is visible
    await expect(component).toBeVisible();

    // Check if the header text is correct
    await expect(component).toContainText(headerText);

    // Check if the subtitle text is correct
    await expect(component).toContainText(subtitleText);
});
