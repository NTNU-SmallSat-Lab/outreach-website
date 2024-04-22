# Introduction

Playwright Test was created specifically to accommodate the needs of end-to-end testing. Playwright supports all modern rendering engines including Chromium, WebKit, and Firefox. Test on Windows, Linux, and macOS, locally or on CI, headless or headed with native mobile emulation of Google Chrome for Android and Mobile Safari.

This project uses Playwright Test for both end-to-end testing and component testing. The test files can be found in this folder:

```
IT2901-SmallSatLab-Hypso\frontend\tests
```

## Download Browsers

Download the necessary browsers to run the tests.

```
npx playwright install
```

# End-to-end testing

See the [docs](https://playwright.dev/docs/intro) for more info about End-to-end testing in Playwright.

## Running tests

By default tests will be run on all 3 browsers, chromium, firefox and webkit using all available workers (usually between 3-6). This can be configured in the playwright.config file. Tests are run in headless mode meaning no browser will open up when running the tests. Results of the tests and test logs will be shown in the terminal.

Move to the frontend folder and run the tests.

```
cd frontend
npm run test
```

### HTML Test Reports

After your test completes, an HTML Reporter will be generated, which shows you a full report of your tests allowing you to filter the report by browsers, passed tests, failed tests, skipped tests and flaky tests. You can click on each test and explore the test's errors as well as each step of the test. By default, the HTML report is opened automatically if some of the tests failed.

### Running Tests in UI Mode

Run your tests with UI Mode for a better developer experience with time travel debugging, watch mode and more.

```
npm run testui
```

### Running Codegen

Use the codegen command to run the test generator followed by the URL of the website you want to generate tests for. The URL is optional and you can always run the command without it and then add the URL directly into the browser window instead.

```
npm run codegen
```

### Updating Playwright

To update Playwright to the latest version run the following command:

```
npm install -D @playwright/test@latest
```

You can always check which version of Playwright you have by running the following command:

```
npx playwright --version
```

### System requirements

- Node.js 16+
- Windows 10+, Windows Server 2016+ or Windows Subsystem for Linux (WSL).
- MacOS 12 Monterey, MacOS 13 Ventura, or MacOS 14 Sonoma.
- Debian 11, Debian 12, Ubuntu 20.04 or Ubuntu 22.04, with x86-64 or arm64 architecture.

# Component testing

See the [docs](https://playwright.dev/docs/test-components) for more info about component testing in Playwright.

## Running tests

You can run tests using the VS Code extension or the command line.

Move to the frontend folder and run the tests.

```
cd frontend
npm run test-ct
```


### Further reading: configure reporting, browsers, tracing
Refer to [Playwright](https://playwright.dev/docs/test-configuration) for configuring the project.
