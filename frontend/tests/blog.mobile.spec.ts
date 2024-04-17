import { test, expect } from "@playwright/test";

test.describe("Blogs pages test", () => {
    test.use({
        viewport: { width: 390, height: 844 },
    });
    test("blogsOverviewPageTest", async ({ page } ) => {
        await page.goto("/");
        await page.getByRole("navigation").getByRole("button").click();
        await page.getByRole("button", { name: "Blog" }).click();
        await expect(page).toHaveURL("/blog");
        await expect(page.getByTestId("pageHeader")).toBeVisible();
        await expect(page.getByTestId("pageSubtitle")).toBeVisible();
        await page.getByTestId("blogsSatellitesButton").click();
        await expect(page).toHaveURL("/blog?page=1&tag=Satellites");
        await expect(page.getByTestId("articleTag")).toHaveText("Satellites");
        await page.getByTestId("blogCardLink").click();
        await expect(page).toHaveURL(/\/blog\/.+$/);
    });
    test("individualBlogPagetest", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("navigation").getByRole("button").click();
        await page.getByRole("button", { name: "Blog" }).click();
        await expect(page).toHaveURL("/blog");
        await page.getByTestId("blogCardLink").first().click();
        await expect(page).toHaveURL(/\/blog\/.+$/);
        await expect(page.getByTestId('blockParagraph').first()).toBeVisible();
    })
})