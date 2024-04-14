import { test, expect } from "@playwright/test";

//BASE_URL: http://web.hypso.ies.ntnu.no:3000/

test.describe("All Project Page Test", () => {
    test("CheckHeadingAndSubtitleIsVisible", async ({ page }) => {
        await page.goto("/");
        await page.getByRole('button', { name: 'Projects' }).click();
        await expect(page).toHaveURL("/projects");
        await expect(page.getByTestId('pageHeader')).toBeVisible();
        await expect(page.getByTestId('pageSubtitle')).toBeVisible();
    });
    test("CheckIfCardIsClickable", async ({ page }) => {
        await page.goto("/");
        await page.getByRole('button', { name: 'Projects' }).click();
        await expect(page).toHaveURL("/projects");
        await expect(page.getByTestId('projectCard').first()).toBeVisible();
        await page.getByTestId("projectCard").first().click(); 
        //Checks if the URL matches /projects/anyslug
        await expect(page).toHaveURL(/\/projects\/.+$/);

    });
    
});

test.describe("Individual Project Page Test", () => {
    test("TestHeadingAndParagraphIsVisible", async ({ page }) => {
        await page.goto("/");
        await page.getByRole('button', { name: 'Projects' }).click();
        await page.getByTestId("projectCard").first().click();
        await expect(page).toHaveURL(/\/projects\/.+$/); 
        await expect(page.getByRole('heading').first()).toBeVisible();
        await expect(page.getByTestId('blockParagraph').first()).toBeVisible();

    });

    
});