import {
    defineConfig,
    devices,
    type PlaywrightTestConfig,
} from "@playwright/experimental-ct-react";

/**
 * See https://playwright.dev/docs/test-configuration.
 */

// playwright.config.js

import { resolve } from "path";
export default defineConfig({
    testDir: "./tests/componentTests",
    /* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
    snapshotDir: "./tests/componentTests/__snapshots__",
    /* Maximum time one test can run for. */
    timeout: 10 * 1000,
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: "html",
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on-first-retry",

        /* Port to use for Playwright component endpoint. */
        ctPort: 3100,
        ctViteConfig: {
            resolve: {
                alias: {
                    "@/components": resolve("./src/components"),
                    "@/lib": resolve("./src/lib"),
                },
            },
        },
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
        },
        {
            name: "webkit",
            use: { ...devices["Desktop Safari"] },
        },
    ],
});
