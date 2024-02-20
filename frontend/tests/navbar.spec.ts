import { test, expect } from "@playwright/test";

test("HomepageNavbarTest", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("SmallSatLabBlogProjectsAbout")).toBeVisible();
    await expect(page.getByRole("navigation")).toContainText("SmallSatLab");
    await expect(page.getByRole("navigation")).toContainText("Blog");
    await expect(page.getByRole("button", { name: "Projects" })).toBeVisible();
    await expect(page.getByRole("button").nth(3)).toBeVisible();
    await page.getByRole("button", { name: "About", exact: true }).click();
    await expect(page.getByRole("link", { name: "Team" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Partners" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Contact" })).toBeVisible();
});

test("NavbarTest", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Blog" }).click();
    await expect(page.getByRole("main").first()).toContainText("Blog");
    await page.getByRole("button", { name: "Projects" }).click();
    await page.getByRole("button", { name: "About", exact: true }).click();
    await page.getByRole("link", { name: "Team" }).click();
    await page.getByRole("button", { name: "About", exact: true }).click();
    await page.getByRole("link", { name: "Partners" }).click();
    await expect(page.getByRole("main").first()).toContainText(
        "Partners and Collaborators",
    );
    await page.getByRole("button", { name: "About", exact: true }).click();
    await page.getByRole("link", { name: "Contact" }).click();
    await expect(page.getByRole("main").first()).toContainText("Contact");
});
