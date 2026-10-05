import { expect, test } from "@playwright/test";

const HEX_COLOR = /^#[0-9a-f]{6}$/;

function manifestIconSources(manifest: unknown): string[] {
  if (typeof manifest !== "object" || manifest === null || !("icons" in manifest) || !Array.isArray(manifest.icons)) {
    throw new Error("manifest has no icons array");
  }
  return manifest.icons.map((icon: unknown) => {
    if (typeof icon !== "object" || icon === null || !("src" in icon) || typeof icon.src !== "string") {
      throw new Error("manifest icon without src");
    }
    return icon.src;
  });
}

test("declares favicon, app icons and manifest that resolve", async ({ page, request }) => {
  await page.goto("/");
  const hrefs = await page.locator('link[rel="icon"], link[rel="apple-touch-icon"], link[rel="manifest"]').evaluateAll((links) =>
    links.map((link) => link.getAttribute("href") ?? ""),
  );
  expect(hrefs.some((href) => href.includes("icon.svg"))).toBe(true);
  expect(hrefs.some((href) => href.includes("apple-icon"))).toBe(true);
  expect(hrefs.some((href) => href.includes("manifest"))).toBe(true);
  for (const href of hrefs) {
    expect((await request.get(href)).status(), href).toBe(200);
  }

  const manifest: unknown = await (await request.get("/manifest.webmanifest")).json();
  const sources = manifestIconSources(manifest);
  expect(sources.length).toBeGreaterThan(0);
  for (const src of sources) {
    expect((await request.get(src)).status(), src).toBe(200);
  }
});

for (const colorScheme of ["light", "dark"] as const) {
  test(`the SVG favicon uses the current ${colorScheme} theme tokens`, async ({ page, request }) => {
    await page.emulateMedia({ colorScheme });
    await page.goto("/");
    const tokens = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      const names = ["--surface", "--highlight-1", "--highlight-2", "--highlight-3", "--highlight-5", "--metal-gold-1", "--metal-gold-2", "--metal-gold-3", "--metal-gold-4"];
      return names.map((name) => ({ name, value: style.getPropertyValue(name).trim().toLowerCase() }));
    });
    const icon = (await (await request.get("/icon.svg")).text()).toLowerCase();
    for (const { name, value } of tokens) {
      expect(value, `${name} must be a six-digit hex colour`).toMatch(HEX_COLOR);
      expect(icon, `${name} (${value}) is missing from icon.svg`).toContain(value);
    }
  });
}

test("shares an absolute social image with alternative text", async ({ page, request }) => {
  await page.goto("/");
  const image = await page.locator('meta[property="og:image"]').getAttribute("content");
  const alt = await page.locator('meta[property="og:image:alt"]').getAttribute("content");
  expect(image).toMatch(/^https:\/\/irina-ichim\.com\//);
  expect(alt).toBeTruthy();
  expect((await request.get(new URL(image ?? "").pathname)).status()).toBe(200);
});

test("the header logo links home with an accessible name and hides the decorative SVG", async ({ page }) => {
  await page.goto("/");
  const home = page.getByRole("link", { name: "Irina Ichim Studio, ir al inicio" });
  await expect(home).toBeVisible();
  await expect(home).toHaveAttribute("href", "/");
  await expect(home.locator("svg")).toHaveAttribute("aria-hidden", "true");
});
