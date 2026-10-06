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

const GRADIENT_TOKENS = [
  "--highlight-1", "--highlight-2", "--highlight-3", "--highlight-4", "--highlight-5",
  "--metal-gold-1", "--metal-gold-2", "--metal-gold-3", "--metal-gold-4", "--metal-gold-5",
];

const BRAND_FILES = [
  { path: "/icon.svg", schemes: ["light", "dark"], tokens: ["--surface", ...GRADIENT_TOKENS] },
  { path: "/marca/logo-light.svg", schemes: ["light"], tokens: ["--ink", "--ink-muted", ...GRADIENT_TOKENS] },
  { path: "/marca/logo-dark.svg", schemes: ["dark"], tokens: ["--ink", "--ink-muted", ...GRADIENT_TOKENS] },
] as const;

for (const file of BRAND_FILES) {
  for (const colorScheme of file.schemes) {
    test(`${file.path} uses the current ${colorScheme} theme tokens`, async ({ page, request }) => {
      await page.emulateMedia({ colorScheme });
      await page.goto("/");
      const tokens = await page.evaluate((names) => {
        const style = getComputedStyle(document.documentElement);
        return names.map((name) => ({ name, value: style.getPropertyValue(name).trim().toLowerCase() }));
      }, [...file.tokens]);
      const svg = (await (await request.get(file.path)).text()).toLowerCase();
      for (const { name, value } of tokens) {
        expect(value, `${name} must be a six-digit hex colour`).toMatch(HEX_COLOR);
        expect(svg, `${name} (${value}) is missing from ${file.path}`).toContain(value);
      }
    });
  }
}

test("shares an absolute social image with alternative text", async ({ page, request }) => {
  await page.goto("/");
  const image = await page.locator('meta[property="og:image"]').getAttribute("content");
  const alt = await page.locator('meta[property="og:image:alt"]').getAttribute("content");
  expect(image).toMatch(/^https:\/\/irina-ichim\.com\//);
  expect(alt).toBeTruthy();
  expect((await request.get(new URL(image ?? "").pathname)).status()).toBe(200);
});

test("the header logo links home with an accessible name and hides the decorative SVGs", async ({ page }) => {
  await page.goto("/");
  const home = page.getByRole("banner").getByRole("link", { name: "Irina Ichim Studio, ir al inicio" });
  await expect(home).toBeVisible();
  await expect(home).toHaveAttribute("href", "/");
  for (const svg of await home.locator("svg").all()) {
    await expect(svg).toHaveAttribute("aria-hidden", "true");
  }
});
