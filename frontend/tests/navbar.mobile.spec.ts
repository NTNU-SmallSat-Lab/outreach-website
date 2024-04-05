import { test, expect } from "@playwright/test";

test.describe("Navbar Test", () => {
    test.use({
        viewport: { width: 390, height: 844 },
    });

    test("HomepageNavbarTest", async ({ page }) => {
        await page.goto("/");
        await expect(
            page.getByRole("navigation").getByRole("button"),
        ).toBeVisible();
        await page.getByRole("navigation").getByRole("button").click();
        await expect(page.getByRole("button", { name: "Blog" })).toBeVisible();
        await expect(
            page.getByRole("button", { name: "Projects" }),
        ).toBeVisible();
        await expect(
            page.getByRole("button", { name: "Satellites" }),
        ).toBeVisible();
    });

    test("NavbarClickLinksTest", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("navigation").getByRole("button").click();
        await page.getByRole("button", { name: "Blog" }).click();
        await expect(page).toHaveURL("/blog");
        await page.getByRole("button", { name: "Projects" }).click();
        await expect(page).toHaveURL("/projects");
        await page.getByRole("button", { name: "Satellites" }).click();
        await expect(page).toHaveURL("/satellites");
        await page.locator(".fixed").first().click();
        await page.getByRole("link", { name: "logo" }).click();
        await expect(page).toHaveURL("/");
    });
});
