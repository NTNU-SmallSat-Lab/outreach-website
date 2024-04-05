import { defineConfig, devices } from "@playwright/test";
import path from "path";
import fs from "fs";
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const baseURL = `http://web.hypso.ies.ntnu.no:3000/`;

function isMobileTest(filename: string) {
    return filename.startsWith("navbar.mobile");
}

function isDesktopTest(filename: string) {
    return filename.startsWith("navbar.desktop");
}

// Function to get all test files in the directory
function getTestFiles(directory: string) {
    return fs
        .readdirSync(directory)
        .filter((file) => file.endsWith(".spec.ts"));
}

// Get all test files
const testFiles = getTestFiles("./tests");

// Check if there are mobile or desktop test files
const mobileTestFiles = testFiles.some(isMobileTest);
const desktopTestFiles = testFiles.some(isDesktopTest);

// Define projects based on the presence of mobile or desktop test files
const projects = [
    ...(mobileTestFiles
        ? [
              {
                  name: "Mobile Safari",
                  use: { ...devices["iPhone 13"] },
              },
          ]
        : []),
    ...(desktopTestFiles
        ? [
              {
                  name: "firefox",
                  use: { ...devices["Desktop Firefox"] },
              },
              {
                  name: "webkit",
                  use: { ...devices["Desktop Safari"] },
              },
              {
                  name: "Google Chrome",
                  use: { ...devices["Desktop Chrome"], channel: "chrome" },
              },
          ]
        : []),
];

export default defineConfig({
    testDir: "./tests",
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
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL,

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on-first-retry",
    },
    projects,
});
