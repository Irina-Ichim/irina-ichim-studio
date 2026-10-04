import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const BASE_URL = `http://localhost:${PORT}`;
const RESPONSIVE = /responsive\.spec\.ts$/;
const ACCESSIBILITY = /accessibility\.spec\.ts$/;

export default defineConfig({
  testDir: "./pruebas",
  outputDir: "./test-results",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
  },
  webServer: {
    command: `npm run build && npm run start -- -p ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
  projects: [
    { name: "large-desktop", testMatch: RESPONSIVE, use: { ...devices["Desktop Chrome"], viewport: { width: 2560, height: 1440 } } },
    { name: "desktop", testMatch: [RESPONSIVE, ACCESSIBILITY], use: { ...devices["Desktop Chrome"], viewport: { width: 1366, height: 768 } } },
    { name: "desktop-safari", testMatch: RESPONSIVE, use: { ...devices["Desktop Safari"], viewport: { width: 1440, height: 900 } } },
    { name: "desktop-zoom-200", testMatch: RESPONSIVE, use: { ...devices["Desktop Chrome"], viewport: { width: 683, height: 384 }, deviceScaleFactor: 2 } },
    { name: "tablet-portrait", testMatch: RESPONSIVE, use: { ...devices["iPad Mini"] } },
    { name: "tablet-landscape", testMatch: RESPONSIVE, use: { ...devices["iPad Pro 11 landscape"] } },
    { name: "mobile-portrait-ios", testMatch: [RESPONSIVE, ACCESSIBILITY], use: { ...devices["iPhone 15"] } },
    { name: "mobile-landscape-ios", testMatch: RESPONSIVE, use: { ...devices["iPhone 15 landscape"] } },
    { name: "mobile-portrait-android", testMatch: RESPONSIVE, use: { ...devices["Pixel 7"] } },
    { name: "mobile-landscape-android", testMatch: RESPONSIVE, use: { ...devices["Pixel 7 landscape"] } },
  ],
});
