import { test, expect } from "@playwright/test";

test.describe("Featured Image Test", () => {
    test.use({
        viewport: { width: 390, height: 844 },
    });
    test("Featured Image Test", async ({ page }) => {
        await page.goto("/");
    await expect(
        page.getByRole("img", { name: "Featured satellite image" }),
    ).toBeVisible();
    await expect(
        page.getByRole("heading", { name: "Featured Satellite Image" }),
    ).toBeVisible();
    });
 });
