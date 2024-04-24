import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
    await page.goto("/");
    await expect(
        page.getByRole("img", { name: "Featured satellite image" }),
    ).toBeVisible();
    await expect(
        page.getByRole("heading", { name: "Featured Satellite Image" }),
    ).toBeVisible();
});
