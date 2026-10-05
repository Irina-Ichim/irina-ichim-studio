import { expect, test } from "@playwright/test";
import { COLOR_SCHEMES } from "./routes";

for (const colorScheme of COLOR_SCHEMES) {
  test(`browser theme-color matches --surface in ${colorScheme}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.goto("/");
    const metaColor = await page.locator(`meta[name="theme-color"][media="(prefers-color-scheme: ${colorScheme})"]`).getAttribute("content");
    const surface = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--surface").trim());
    expect(surface).not.toBe("");
    expect(metaColor?.toLowerCase()).toBe(surface.toLowerCase());
  });

  test(`declares both colour schemes so browsers do not force dark mode (${colorScheme})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.goto("/");
    await expect(page.locator('meta[name="color-scheme"]')).toHaveAttribute("content", "light dark");
  });
}
