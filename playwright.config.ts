import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1, //process.env.CI ? 2 : 0,
  workers: 1, // process.env.CI ? 1 : undefined,
  reporter: [
    ["list"],
    ["json", { outputFile: "playwright-report.json" }],
    ["allure-playwright", { outputFolder: "allure-results" }],
  ],
  globalTeardown: "./utils/global-teardown.ts",
  use: {
    trace: "on-first-retry",
    headless: false,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
