import { test, expect } from "@playwright/test";

test("HomepageNavbarTest", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "logo" })).toBeVisible();
    await expect(page.getByRole("navigation")).toContainText("Blog");
    await expect(page.getByRole("navigation")).toContainText("Projects");
    await expect(page.getByRole("navigation")).toContainText("Satellites");
});

test("NavbarClickLinksTest", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Blog" }).click();
    await expect(page).toHaveURL("/blog");
    await page.getByRole("button", { name: "Projects" }).click();
    await expect(page).toHaveURL("/projects");
    await page.getByRole("button", { name: "Satellites" }).click();
    await expect(page).toHaveURL("/satellites");
    await page.getByRole("link", { name: "logo" }).click();
    await expect(page).toHaveURL("/");
});
