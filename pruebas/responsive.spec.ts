import { expect, test } from "@playwright/test";
import { COLOR_SCHEMES, ROUTES, routeSlug } from "./routes";

const MIN_TARGET_SIZE = 44;
const SCREENSHOT_DIR = "auditorias/responsive/capturas";

for (const route of ROUTES) {
  for (const colorScheme of COLOR_SCHEMES) {
    test.describe(`${route} · ${colorScheme}`, () => {
      test.use({ colorScheme });

      test("has no horizontal scroll", async ({ page }) => {
        await page.goto(route);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow, "page is wider than the viewport").toBeLessThanOrEqual(0);
      });

      test("interactive targets are at least 44 × 44 px", async ({ page }) => {
        await page.goto(route);
        const undersized = await page.evaluate((min) => {
          const selector = "a[href], button, input:not([type=hidden]), select, textarea, [role=button], [role=switch]";
          return Array.from(document.querySelectorAll<HTMLElement>(selector))
            .filter((element) => {
              const style = getComputedStyle(element);
              const box = element.getBoundingClientRect();
              const visible = style.visibility !== "hidden" && box.width > 0 && box.height > 0;
              return visible && style.display !== "inline" && (box.width < min || box.height < min);
            })
            .map((element) => `${element.tagName.toLowerCase()} "${element.textContent.trim().slice(0, 40)}" ${Math.round(element.getBoundingClientRect().width)}×${Math.round(element.getBoundingClientRect().height)}`);
        }, MIN_TARGET_SIZE);
        expect(undersized, "targets below the WCAG 2.5.5 AAA size").toEqual([]);
      });

      test("renders styled content and captures a full-page screenshot", async ({ page }, testInfo) => {
        await page.goto(route);
        await expect(page.locator("main")).toBeVisible();
        await page.evaluate(() => document.fonts.ready);
        const styles = await page.evaluate(() => ({
          surface: getComputedStyle(document.documentElement).getPropertyValue("--surface").trim(),
          bodyFont: getComputedStyle(document.body).fontFamily,
        }));
        expect(styles.surface, "design tokens are not loaded").not.toBe("");
        expect(styles.bodyFont, "brand font is not applied").toContain("Figtree");
        const slug = routeSlug(route);
        const screenshot = await page.screenshot({
          fullPage: true,
          animations: "disabled",
          path: `${SCREENSHOT_DIR}/${testInfo.project.name}/${slug}-${colorScheme}.png`,
        });
        await testInfo.attach(`${testInfo.project.name}-${slug}-${colorScheme}`, { body: screenshot, contentType: "image/png" });
      });
    });
  }
}
