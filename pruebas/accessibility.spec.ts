import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { COLOR_SCHEMES, ROUTES } from "./routes";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag2aaa", "wcag21a", "wcag21aa", "wcag22aa"];

for (const route of ROUTES) {
  for (const colorScheme of COLOR_SCHEMES) {
    test(`${route} · ${colorScheme} has no WCAG AAA violations`, async ({ page }) => {
      await page.emulateMedia({ colorScheme });
      await page.goto(route);
      // The home opening runs for about ten seconds; contrast is measured on the settled
      // page, not on a half-faded frame.
      await page.waitForFunction(() => document.getAnimations().every((animation) => animation.playState === "finished"), undefined, {
        timeout: 15_000,
      });
      const { violations } = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
      const summary = violations.map((violation) => `${violation.id} (${violation.impact ?? "n/a"}): ${violation.nodes.length} × ${violation.help}`);
      expect(summary).toEqual([]);
    });
  }
}
