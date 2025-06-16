import { test, expect } from "@playwright/test";
import { Sliders } from "lucide-react";

test.describe("All Satellites Page Test", () => {
    test("CheckHeadingAndSubtitleIsVisible", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("button", { name: "Satellites" }).click();
        await expect(page).toHaveURL("/satellites");
        await expect(page.getByTestId("pageHeader")).toBeVisible();
        await expect(page.getByTestId("pageSubtitle")).toBeVisible();
    });
    test("CheckIfCardIsClickable", async ({ page }) => {
        await page.goto("/");
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
    test("TestHeadingAndParagraphIsVisible", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("button", { name: "Satellites" }).click();
        await page.getByTestId("satellitesTableRow").first().click();
        await expect(page).toHaveURL(/\/satellites\/.+$/);
        await expect(page.getByRole("heading").first()).toBeVisible();
        await expect(page.getByRole("heading").nth(2)).toBeVisible();
        await expect(page.getByTestId("blockParagraph").first()).toBeVisible();
    });

    test("TestChangingPredictionTime", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("button", { name: "Satellites" }).click();
        await page.getByTestId("satellitesTableRow").first().click();
        await expect(page).toHaveURL(/\/satellites\/.+$/);
        const slider = page.getByTestId("prediction-slider");
        await expect(slider).toHaveValue("120");
        await slider.fill("180"); //Prediction of position in 180 minutes
        await expect(slider).toHaveValue("180");
    });
});
