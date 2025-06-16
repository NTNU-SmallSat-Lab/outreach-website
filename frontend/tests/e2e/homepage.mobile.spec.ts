import { test, expect } from "@playwright/test";
import exp from "constants";

test.describe("Homepage Test", () => {
    test.use({
        viewport: { width: 390, height: 844 },
    });
    test("CheckSatelliteSelector", async ({ page }) => {
        await page.goto("/");
        await expect(
            page.getByTestId("satellite-dropdown-button"),
        ).toBeVisible();
        await page.getByTestId("satellite-dropdown-button").click();
        await expect(page.getByTestId("satellite-dropdown-list")).toBeVisible();
        await expect(
            page.getByTestId("satellite-dropdown-list").getByRole("option"),
        ).toHaveCount(2); // By default, there are two options: "Hypso-1" and "Hypso-2"
        await page
            .getByTestId("satellite-dropdown-list")
            .getByRole("option")
            .nth(1)
            .click();
        await expect(page.getByTestId("satellite-name")).toHaveText("HYPSO-2");
    });
    test("CheckPassOverTimeSelector", async ({ page }) => {
        await page.goto("/");
        await expect(page.getByTestId("location-name")).toHaveText("Trondheim");
        await expect(
            page.getByTestId("location-dropdown-button"),
        ).toBeVisible();
        await page.getByTestId("location-dropdown-button").click();
        await expect(page.getByTestId("location-dropdown-list")).toHaveCount(1); // By default, only one location is available
        await expect(page.getByTestId("latitude-input")).toBeVisible();
        await expect(page.getByTestId("longitude-input")).toBeVisible();
        await page.getByTestId("latitude-input").fill("1");
        await page.getByTestId("longitude-input").fill("1");
        await page.getByTestId("add-location-button").click();
        await page
            .getByTestId("location-dropdown-list")
            .getByRole("option")
            .nth(1)
            .click();
        await expect(page.getByTestId("location-name")).toHaveText(
            "1.00° N, 1.00° E",
        );
    });
});
