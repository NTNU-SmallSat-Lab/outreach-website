import { test, expect } from "@playwright/test";

test.describe("All Satellites Page Test", () => {
    test.use({
        viewport: { width: 390, height: 844 },
    });

    test("CheckHeadingAndSubtitleIsVisible", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("navigation").getByRole("button").click();
        await page.getByRole("button", { name: "Satellites" }).click();
        await expect(page).toHaveURL("/satellites");
        await expect(page.getByTestId("pageHeader")).toBeVisible();
        await expect(page.getByTestId("pageSubtitle")).toBeVisible();
    });
    test("CheckIfCardIsClickable", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("navigation").getByRole("button").click();
        await page.getByRole("button", { name: "Satellites" }).click();
        await expect(page).toHaveURL("/satellites");
        await expect(
            page.getByTestId("satellitesTableRow").first(),
        ).toBeVisible();
        await page.getByTestId("satellitesTableRow").first().click();
        //Checks if the URL matches /satellites/anySlug
        await expect(page).toHaveURL(/\/satellites\/.+$/);
    });
});

test.describe("Individual Satellite Page Test", () => {
    test.use({
        viewport: { width: 390, height: 844 },
    });

    test("TestHeadingAndParagraphIsVisible", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("navigation").getByRole("button").click();
        await page.getByRole("button", { name: "Satellites" }).click();
        await page.getByTestId("satellitesTableRow").first().click();
        await expect(page).toHaveURL(/\/satellites\/.+$/);
        await expect(page.getByRole("heading").first()).toBeVisible();
        await expect(page.getByRole("heading").nth(2)).toBeVisible();
        await expect(page.getByTestId("blockParagraph").first()).toBeVisible();
    });
});
