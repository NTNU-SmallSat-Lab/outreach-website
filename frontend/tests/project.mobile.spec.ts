import { test, expect } from "@playwright/test";

//BASE_URL: http://web.hypso.ies.ntnu.no:3000/

test.describe("All Project Page Test", () => {
    test.use({
        viewport: { width: 390, height: 844 },
    });
    test("CheckHeadingAndSubtitleIsVisible", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("navigation").getByRole("button").click();
        await page.getByRole('button', { name: 'Projects' }).click();
        await expect(page).toHaveURL("/projects");
        await expect(page.getByTestId('pageHeader')).toBeVisible();
        await expect(page.getByTestId('pageSubtitle')).toBeVisible();
    });
    test("CheckIfCardIsClickable", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("navigation").getByRole("button").click();
        await page.getByRole('button', { name: 'Projects' }).click();
        await expect(page).toHaveURL("/projects");
        await expect(page.getByTestId('projectCard').first()).toBeVisible();
        await page.getByTestId("projectCard").first().click(); 
        //Checks if the URL matches /projects/anySlug
        await expect(page).toHaveURL(/\/projects\/.+$/);
    });
    
});

test.describe("Individual Project Page Test", () => {
    test.use({
        viewport: { width: 390, height: 844 },
    });
    test("TestHeadingAndParagraphIsVisible", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("navigation").getByRole("button").click();
        await page.getByRole('button', { name: 'Projects' }).click();
        await page.getByTestId("projectCard").first().click();
        await expect(page).toHaveURL(/\/projects\/.+$/); 
        await expect(page.getByRole('heading').first()).toBeVisible();
        await expect(page.getByTestId('blockParagraph').first()).toBeVisible();
    });
});